import React, { useState } from "react";
import "../styles/Auth.css";
import { auth } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import CopyrightIcon from "@material-ui/icons/Copyright";
import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from "../actions/actions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "20vh",
    width: "45vh",
  },

  Button: {
    backgroundColor: "#D09683",
    width: "45vh",
    marginBottom: 10,
  },

  firstInput: {
    marginBottom: 20,
    width: "45vh",
  },
  input: {
    width: "45vh",
    marginBottom: 20,
  },
  signUp: {
    color: "rgb(149, 136, 233)",
    cursor: "pointer",
    marginLeft: 65,
    fontWeight: "bold",
  },
  span: {
    fontSize: 12,
  },
}));

function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: SIGNIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGNIN_ERROR, payload: err.message });
      });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src="http://localhost:3000/images/smile.jpg"
          alt="logo"
          width="100"
        />
      </div>
      <Card id="form">
        <form className="formControl" noValidate autoComplete="off">
          <h1 style={{ color: "gray" }}>Sign in</h1>
          <TextField
            autoComplete="off"
            className={classes.firstInput}
            type="email"
            label="Email"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <TextField
            className={classes.input}
            autoComplete="off"
            type="password"
            label="Password"
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />

          <div className="Btn">
            <Button
              className={classes.Button}
              variant="outlined"
              onClick={signIn}
            >
              Sign In
            </Button>
          </div>
          <div
            style={{
              width: "45vh",
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <span className={classes.span}> Not Registered?</span>
            <span className={classes.signUp}>
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CopyrightIcon fontSize="small" />
        <span>2021</span>
      </div>
    </>
  );
}

export default SignIn;
