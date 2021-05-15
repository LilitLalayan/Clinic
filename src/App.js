import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/service/Services";
import Doctors from "./components/Doctors";
import Contacts from "./components/contacts/Contacts";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Shop from "./components/shop/ShoppingItem";
import Profile from "./components/Profile";
import ShopHome from "./components/shop/ShopHome";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LinearProgress, Snackbar } from "@material-ui/core";
import { auth, db } from ".";
import { SET_LOGGEDIN_USER } from "./actions/actions";
import { connect, useSelector } from "react-redux";
import {
  selectIsAuthenticating,
  selectLoggedinUser,
} from "./reducers/selectors";
import Booking from "./components/Booking";
import Basket from "./components/shop/Basket";
import Payment from "./components/shop/Payment";

function App({ dispatch }) {
  const loggedInUser = useSelector(selectLoggedinUser);
  const isAuthenticating = useSelector(selectIsAuthenticating);
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

  if (isAuthenticating) {
    return <LinearProgress />;
    console.log(777);
  }
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
            <Route path="/shop" component={Shop} />
            <Route path="/booking" component={Booking} />
            <Route path="/basket" component={Basket} />
            <Route path="/payment" component={Payment} />
            <Route path="/shophome" component={ShopHome}></Route>
            <Route path="/profile" component={Profile} />
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
            <Route path="/basket" component={Basket} />
            <Route path="/payment" component={Payment} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
     
    </Router>
  );
}

export default connect()(App);
