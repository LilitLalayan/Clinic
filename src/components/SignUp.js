import React, { useState } from "react";
import "../styles/Auth.css";
import { auth, db } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import CopyrightIcon from "@material-ui/icons/Copyright";
import {
  NAME_CHANGE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../actions/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "20vh",
    width: "45vh",
    marginBottom: 20,
  },

  Button: {
    backgroundColor: "#D09683",
    width: "45vh",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    width: "45vh",
    marginTop: 20,
  },
  firstInput: {
    width: "45vh",
  },
}));

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const signUp = () => {
    auth

      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        db.collection("users").doc(resp.user.uid).set({
          fullName: name,
          email: email,
        });
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGNUP_ERROR, payload: err.message });
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
        <form className="form" noValidate autoComplete="off">
          <h1 style={{ color: "gray" }}>Sign up</h1>
          <TextField
            autoComplete="off"
            required
            className={classes.firstInput}
            type="text"
            label="Full Name"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />

          <TextField
            autoComplete="off"
            required
            className={classes.input}
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
            autoComplete="off"
            required
            className={classes.input}
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
              onClick={signUp}
            >
              Sign Up
            </Button>
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

export default SignUp;
