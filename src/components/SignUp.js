import React from "react";
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
    marginTop: 20,
  },
  input: {
    width: "45vh",
    marginTop: 20,
  },
}));

function SignUp({ name, email, password, dispatch }) {
  const classes = useStyles();

  const signUp = async (user) => {
    await auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((resp) => {
        db.collection("users").doc(resp.user.uid).set({
          fullName: user.name,
          Email: user.email,
          Password: user.password,
        });
        console.log(user);
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
      <h1 style={{ textAlign: "center", color: "gray" }}>Sign up</h1>
      <Card id="form">
        <form className="form" noValidate autoComplete="off">
          <TextField
            autoComplete="off"
            required
            className={classes.input}
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
              console.log(name);
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
  name: state.name,
  emailError: state.emailError,
  passwordError: state.passwordError,
});
export default connect(mapStateToProps)(SignUp);
