import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Contacts from "./components/Contacts";
import SignIn from "./components/SignIn";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Home" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/doctors" component={Doctors} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/signin" component={SignIn} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
