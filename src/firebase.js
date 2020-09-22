import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCsZN26eph2XdMod7_sqWkiPg6ZyrvtKqQ",
    authDomain: "todo-sunbun.firebaseapp.com",
    databaseURL: "https://todo-sunbun.firebaseio.com",
    projectId: "todo-sunbun",
    storageBucket: "todo-sunbun.appspot.com",
    messagingSenderId: "654558076746",
    appId: "1:654558076746:web:4dd2f65ab9b19a21966bb3",
    measurementId: "G-3Y9GX4HGTJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const da_ta = firebaseApp.firestore();

export default da_ta;
        