import {
  Button,
  List,
  ListItemAvatar,
  ListItemText,
  Modal,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import da_ta from "./firebase";
import {} from "@material-ui/icons";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo1(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  console.log(input);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    //to Edit and update data in database
    da_ta.collection("my_todo").doc(props.Todo.id).set(
      {
        Todo: input,
      },
      { merge: true }
    );
    setInput("");
    handleClose();
  };

  return (
    <List>
      <ListItemAvatar>
        <ListItemText
          primary={props.Todo_obj.Todo}
          secondary="Add to list successful. Happy Coding!"
        ></ListItemText>
      </ListItemAvatar>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="edit-title">Edit your Todo</h2>
          <form>
            <p id="aria-describedly">
              <FormControl>
                <InputLabel>{props.Todo_obj.Todo}</InputLabel>
                <Input
                  autoFocus
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                ></Input>
              </FormControl>
              <Button type="submit" onClick={updateTodo}>
                Update todo
              </Button>
            </p>
          </form>
        </div>
      </Modal>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<DeleteSharpIcon />}
        onClick={(event) =>
          da_ta.collection("my_todo").doc(props.Todo_obj.id).delete()
        }
      >
        Delete
      </Button>
    </List>
  );
}
export default Todo1;
