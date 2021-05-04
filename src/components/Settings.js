import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "..";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { CHANGE_EMAIL, SET_LOGGEDIN_USER } from "../actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20vh",
    outline: "none",
  },
  coantainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90vh",
  },
  name: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90vh",
  },
  email: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90vh",
    [theme.breakpoints.down(800)]: {
      flexDirection: "column",
    },
  },
  password: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90vh",
    [theme.breakpoints.down(800)]: {
      flexDirection: "column",
    },
  },
  newpass: {
    width: "40vh",
    marginTop: "8px",
  },
  input: {
    width: "40vh",
  },
  newemail: {
    width: "40vh",
    marginTop: "8px",
  },
  Button: {
    width: "20vh",
    height: "6vh",
    backgroundColor: "#7DA3A1",
    color: "white",
    [theme.breakpoints.down(800)]: {
      marginTop: "20px",
      width: "40vh",
    },
  },
  h6: {
    width: "20vh",
    display: "flex",
    justifyContent: "flex-end",
    color: "#7DA3A1",
    fontWeight: "bold",
    [theme.breakpoints.down(800)]: {
      justifyContent: "center",
    },
  },
}));

function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPassword2, setCurrentPassword2] = useState("");

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  const changeEmail = () => {
    reauthenticate(currentPassword2)
      .then(() => {
        const user = auth.currentUser;
        user
          .updateEmail(newEmail)
          .then(function () {
            alert("You have successfully changed your email");
            // console.log(user);
            // dispatch({ type: SET_LOGGEDIN_USER, user });
            setCurrentPassword2("");
            setNewEmail("");
          })
          .catch(function (error) {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const changePassword = () => {
    reauthenticate(currentPassword)
      .then(() => {
        const user = auth.currentUser;
        user
          .updatePassword(newPassword)
          .then(function () {
            alert("You have successfully changed your password");
            setCurrentPassword("");
            setNewPassword("");
          })
          .catch(function (error) {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={classes.coantainer}>
      <form className={classes.form} noValidate autoComplete="off">
        <h1
          style={{
            letterSpacing: "5px",
            marginBottom: "20px",
            color: "gray",
          }}
        >
          Edit profile info
        </h1>

        <div className={classes.email}>
          <h6 className={classes.h6}>Change email</h6>
          <div style={{ width: "40vh" }}>
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Enter current password"
              type="password"
              variant="outlined"
              size="small"
              value={currentPassword2}
              onChange={(e) => {
                setCurrentPassword2(e.target.value);
              }}
            />
            <TextField
              className={classes.newemail}
              id="outlined-basic"
              label="Enter new email"
              variant="outlined"
              size="small"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            />
          </div>
          <Button
            className={classes.Button}
            variant="outlined"
            onClick={changeEmail}
          >
            Change
          </Button>
        </div>
        <div className={classes.password}>
          <h6 className={classes.h6}>Change password</h6>
          <div style={{ width: "40vh" }}>
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Enter current password"
              variant="outlined"
              type="password"
              size="small"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
            <TextField
              className={classes.newpass}
              id="outlined-basic"
              label="Enter new password"
              variant="outlined"
              type="password"
              size="small"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <Button
            className={classes.Button}
            variant="outlined"
            onClick={changePassword}
            size="small"
          >
            Change
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
