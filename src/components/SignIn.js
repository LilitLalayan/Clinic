import React from "react";
import "../styles/Auth.css";
import { auth } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { connect } from "react-redux";
import CopyrightIcon from "@material-ui/icons/Copyright";
import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from "../actions/actions";

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

function SignIn({ email, password, authError, dispatch }) {
  const classes = useStyles();

  const signIn = (credentials) => {
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
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
            <span className={classes.signUp}>
              <a
                style={{ textDecoration: "none", color: "#73605B" }}
                href="http://localhost:3000/signup"
              >
                Sign Up
              </a>
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
const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  emailError: state.emailError,
  passwordError: state.passwordError,
  authError: state.authError,
});
export default connect(mapStateToProps)(SignIn);
