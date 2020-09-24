import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import "./App.css";
import Todo1 from "./Todo1";
import da_ta from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  //console.log(input);

  // This action takes place when the button is clicked
  const addTodo = (event) => {
    //console.log("i am clicked");
    event.preventDefault();

    //Write to database
    da_ta.collection("my_todo").add({
      Todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput("");
  };

  // When the app loads we need to perform operation interacting with database and load those operation
  useEffect(() => {
    //displaying data from database i.e Read
    da_ta
      .collection("my_todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(snapshot.docs.map((doc) => doc.data().Todo));
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            Todo: doc.data().Todo,
          }))
        );
      });
  }, []);

  return (
    <div className="App">
      <h1>Welcome to TODO CURD</h1>
      <p>
        Github:{" "}
        <a href="https://github.com/codersunny/Todo-List">Click Here!</a>
      </p>
      <form>
        <FormControl>
          <InputLabel> Type something....</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></Input>
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="secondary"
          onClick={addTodo}
        >
          Add List
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo1 Todo_obj={todo} />
        ))}
      </ul>
    </div>
  );
}
export default App;
