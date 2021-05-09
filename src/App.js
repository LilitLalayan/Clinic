import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Contacts from "./components/Contacts";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth, db } from ".";
import { CLEAR_INPUTS, SET_LOGGEDIN_USER } from "./actions/actions";
import { connect, useSelector } from "react-redux";
import { selectLogginUser } from "./reducers/selectors";
import Booking from "./components/Booking";

function App({ dispatch }) {
  const loggedInUser = useSelector(selectLogginUser);
  const onAuthStateChanged = async (user) => {
    const userData = user ? { email: user.email, uid: user.uid } : user;
    if (userData) {
      const docRef = db.collection("users").doc(userData.uid);
      const doc = await docRef.get();
      userData.info = doc.data();
    }
    dispatch({
      type: SET_LOGGEDIN_USER,
      user: userData,
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        {loggedInUser ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/doctors" component={Doctors} />
            <Route path="/contacts" component={Contacts} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/doctors" component={Doctors} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/booking" component={Booking} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default connect()(App);
