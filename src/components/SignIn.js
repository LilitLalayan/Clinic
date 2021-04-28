import React, { useState, useEffect } from "react";
import "../styles/Auth.css";
import { auth } from "..";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "white",
    width: 219,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  Button: {
    backgroundColor: "rgb(149, 136, 233)",
    width: 219,
  },
  input: {
    backgroundColor: "white",
  },
  firstInput: {
    marginTop: 20,
    backgroundColor: "white",
  },
  signIn: {
    color: "rgb(129, 123, 38)",
    cursor: "pointer",
    marginLeft: 65,
  },
  span: {
    fontSize: 12,
  },
  signOut: {
    color: "rgb(129, 123, 38)",
    cursor: "pointer",
  },
}));

function SignIn() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [state, setState] = useState({
    gender: "",
    name: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const onAuthStateChanged = (user) => {
    if (user) {
      clearInputs();
      setUser(user);
    } else {
      setUser("");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
  }, []);

  const signIn = () => {
    clearErrors();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid);
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case "Invalid Email":
          case "User not found":
            setEmailError(error.message);
            break;
          case "Wrong password":
            setPasswordError(error.message);
            break;
        }
      });
  };

  const signUp = () => {
    clearErrors();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid);
      })
      .catch((error) => {
        switch (error.code) {
          case "Invalid Email":
          case "This email is already used":
            setEmailError(error.message);
            break;
          case "Weak password":
            setPasswordError(error.message);
            break;
        }
      });
  };

  const signOut = () => {
    auth.signOut();
    console.log("out");
  };

  return (
    <div id="form">
      <form className="form" noValidate autoComplete="off">
        <TextField
          autoComplete="off"
          required
          className={classes.firstInput}
          type="text"
          label="Full Name"
          // variant="filled"
          size="small"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />

        <TextField
          autoComplete="on"
          required
          placeholder="required"
          className={classes.input}
          type="email"
          label="email"
          variant="filled"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <FormControl required variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Gender</InputLabel>
          <Select
            native
            value={state.gender}
            onChange={handleChange}
            inputProps={{
              name: "gender",
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Male</option>
            <option value={20}>Female</option>
          </Select>
        </FormControl>

        <div className="Btn">
          <Button
            className={classes.Button}
            variant="outlined"
            color="inherit"
            onClick={signUp}
          >
            Sign Up
          </Button>
        </div>
        <div style={{ width: "219px" }}>
          <span className={classes.span}> Have an account?</span>
          <span className={classes.signIn} onClick={signIn}>
            Sign In
          </span>
        </div>
        <p className={classes.signOut} onClick={signOut}>
          Sign Out
        </p>
      </form>
    </div>
  );
}

export default SignIn;
