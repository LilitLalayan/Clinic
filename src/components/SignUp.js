import React, { useEffect, useState } from "react";
import { auth, db, storage } from "..";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../actions/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "20vh",
    width: "45vh",
    marginBottom: 20,
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
    height: "57vh",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgb(0 0 0 / 15%)",
  },

  Button: {
    backgroundColor: "#3f51b5",
    width: "45vh",
    marginBottom: 20,
    marginTop: 30,
    color: "white",
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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    storage
      .ref()
      .child(`smile.jpg`)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const signUp = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    if (!name) {
      setNameError("This field can't be blank");
    }
    if (!email) {
      setEmailError("This field can't be blank");
    } else if (!email.includes("@")) {
      setEmailError("Invalid email");
    }
    if (!password) {
      setPasswordError("This field can't be blank");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    }
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
      {url && (
        <div
          className={classes.signinForm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              signUp();
            }
          }}
        >
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img src={url} alt="logo" width="100" />
          </div>
          <Card className={classes.card}>
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
                helperText={nameError}
                error={nameError ? true : false}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />

              <TextField
                autoComplete="email"
                required
                className={classes.input}
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
                autoComplete="off"
                required
                className={classes.input}
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
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
