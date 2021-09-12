import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXhv4lXASOB2J-8V207wbs5f8EXg8Usoo",
  authDomain: "clone-f37d4.firebaseapp.com",
  projectId: "clone-f37d4",
  storageBucket: "clone-f37d4.appspot.com",
  messagingSenderId: "630880353349",
  appId: "1:630880353349:web:5009b259556fd16e88b72c",
};

const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()

export{db}
