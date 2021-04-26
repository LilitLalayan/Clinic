import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDRwXHjyzcXJv-Y8m-2WawHlnmUsSkI2T8",
  authDomain: "dental-clinic-92719.firebaseapp.com",
  projectId: "dental-clinic-92719",
  storageBucket: "dental-clinic-92719.appspot.com",
  messagingSenderId: "474374983626",
  appId: "1:474374983626:web:472e38330486d40dff0933",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
