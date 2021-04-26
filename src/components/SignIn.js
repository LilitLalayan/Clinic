import React, { useEffect } from "react";
import "../styles/Auth.css";
import { auth } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  EMAIL_ERROR,
  PASSWORD_ERROR,
  CLEAR_INPUTS,
  SET_LOGGEDIN_USER,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from "../actions/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "20vh",
    width: "45vh",
  },

  Button: {
    backgroundColor: "rgb(149, 136, 233)",
    width: "45vh",
    marginBottom: 10,
  },

  firstInput: {
    marginTop: 20,
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

function SignIn({
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

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: SET_LOGGEDIN_USER,
        user,
      });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .then(() => {
        dispatch({ type: SIGNIN_SUCCESS });
        clearInputs();
      })
      .catch((err) => {
        dispatch({ type: SIGNIN_ERROR, err });
      });
  };

  const signOut = () => {
    auth.signOut();
    console.log("out");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "gray" }}>Sign in</h1>
      <button onClick={signOut}>Sign Out</button>
      <Card id="form">
        <form className="formControl" noValidate autoComplete="off">
          <TextField
            autoComplete="off"
            className={classes.firstInput}
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
            className={classes.input}
            autoComplete="off"
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
            <span className={classes.signUp}>Sign Up</span>
          </div>
        </form>
      </Card>
    </>
  );
}
const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  emailError: state.emailError,
  passwordError: state.passwordError,
  hasAccount: state.hasAccount,
  authError: state.authError,
});
export default connect(mapStateToProps)(SignIn);
