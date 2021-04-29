import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
