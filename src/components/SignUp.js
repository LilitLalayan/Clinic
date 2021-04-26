import React, { useEffect } from "react";
import "../styles/Auth.css";
import { auth, db } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import {
  NAME_CHANGE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  CLEAR_INPUTS,
} from "../actions/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "20vh",
    width: "45vh",
    marginBottom: 20,
  },

  Button: {
    backgroundColor: "rgb(149, 136, 233)",
    width: "45vh",
    marginBottom: 20,
  },
  input: {
    width: "45vh",
    marginBottom: 20,
  },
  firstInput: {
    width: "45vh",
    marginTop: 20,
    marginBottom: 20,
  },
}));

function SignUp({
  name,
  user,
  email,
  password,
  emailError,
  passwordError,
  authError,
  dispatch,
}) {
  const classes = useStyles();

  const clearInputs = () => {
    dispatch({ type: CLEAR_INPUTS });
  };

  // const onAuthStateChanged = (user) => {
  //   if (user) {
  //     clearInputs();
  //   }
  // };

  // useEffect(() => {
  //   auth.onAuthStateChanged(onAuthStateChanged);
  // }, []);

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        db.collection("users").doc(resp.user.uid).set({
          fullName: user.name,
          Email: user.email,
          Password: user.password,
        });
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
        clearInputs();
      })
      .catch((err) => {
        dispatch({ type: SIGNUP_ERROR, err });
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "gray" }}>Sign up</h1>
      <Card id="form">
        <form className="form" noValidate autoComplete="off">
          <TextField
            autoComplete="off"
            required
            className={classes.firstInput}
            type="text"
            label="Full Name"
            variant="filled"
            size="small"
            value={name}
            onChange={(e) => {
              dispatch({
                type: NAME_CHANGE,
                payload: e.target.value,
              });
            }}
          />
          <br />

          <TextField
            autoComplete="off"
            required
            className={classes.input}
            type="email"
            label="Email"
            variant="filled"
            size="small"
            value={email}
            onChange={(e) => {
              dispatch({
                type: EMAIL_CHANGE,
                payload: e.target.value,
              });
            }}
          />
          <br />

          <TextField
            autoComplete="off"
            required
            className={classes.input}
            type="password"
            label="Password"
            variant="filled"
            size="small"
            value={password}
            onChange={(e) => {
              dispatch({
                type: PASSWORD_CHANGE,
                payload: e.target.value,
              });
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
    </>
  );
}
const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  user: state.user,
  name: state.name,
  emailError: state.emailError,
  passwordError: state.passwordError,
  hasAccount: state.hasAccount,
  authError: state.authError,
});
export default connect(mapStateToProps)(SignUp);
