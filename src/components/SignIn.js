import React, { useState } from "react";
import { auth } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "../actions/actions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "20vh",
    width: "45vh",
  },

  signinForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    marginTop: "5vh",
    marginBottom: "20px",
    width: "60vh",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgb(0 0 0 / 15%)",
  },

  Button: {
    backgroundColor: "#7DA3A1",
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
    color: "#7DA3A1",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
      color: "#7DA3A1",
    },
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signIn = () => {
    if (!email) {
      setEmailError("Please enter your email");
    } else if (!email.includes("@")) {
      setEmailError("Invalid email");
    }
    if (!password) {
      setPasswordError("Please enter your password");
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: SIGNIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGNIN_ERROR, payload: err.message });
        if (
          err.message ===
          "The password is invalid or the user does not have a password."
        ) {
          setPasswordError("Wrong password");
        }
        if (
          err.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          setEmailError("User not found");
        }
      });
  };

  return (
    <div
      className={classes.signinForm}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          signIn();
          console.log("hi");
        }
      }}
    >
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src="http://localhost:3000/images/smile.jpg"
          alt="logo"
          width="100"
        />
      </div>
      <Card className={classes.card}>
        <form className="formControl" noValidate autoComplete="off">
          <h1 style={{ color: "gray" }}>Sign in</h1>
          <TextField
            autoComplete="email"
            className={classes.firstInput}
            name="email"
            label="Email"
            size="small"
            value={email}
            helperText={emailError}
            error={emailError ? true : false}
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
            helperText={passwordError}
            error={passwordError ? true : false}
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
            <span className={classes.span}> Not registered?</span>
            <span>
              <Link to="/signup" className={classes.signUp}>
                Sign up
              </Link>
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
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

export default SignIn;
