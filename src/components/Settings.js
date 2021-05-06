import React, { useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { auth } from "..";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGGEDIN_USER } from "../actions/actions";
import { selectLoggedinUser } from "../reducers/selectors";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20vh",
    outline: "none",
  },

  container: {
    display: "flex",
    width: "100%",
  },
  info: {
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    width: "20%",
    backgroundColor: "#92AAC7",
    alignItems: "center",
    height: "100vh",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "100vh",
    alignItems: "center",
  },
  settings: {
    marginTop: "20px",
    display: "flex",
    border: "2px solid #2D4262",
    borderRadius: "5px",
    width: "90%",
    height: "40vh",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down(900)]: {
      flexDirection: "column",
      height: "80vh",
    },
  },
  email: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    [theme.breakpoints.down(900)]: {
      width: "70%",
    },
  },
  password: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    [theme.breakpoints.down(900)]: {
      width: "70%",
    },
  },
  h6: {
    color: "#2D4262",
    letterSpacing: "3px",
  },
  input: {
    marginTop: "10px",
    width: "100%",
  },
  button: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#92AAC7",
    color: "white",
  },
  history: {
    marginTop: "20px",
    border: "2px solid #2D4262",
    borderRadius: "5px",
    width: "90%",
    height: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tooth: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "5px",
  },
}));

function Settings() {
  const loggedInUser = useSelector(selectLoggedinUser);
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
            console.log(user);
            dispatch({
              type: SET_LOGGEDIN_USER,
              user: {
                ...loggedInUser,
                email: newEmail,
              },
            });
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
    <div className={classes.container}>
      <div className={classes.info}>
        <img
          alt="icon"
          src="http://localhost:3000/images/PikPng.png"
          width="60%"
        />
        <h1
          style={{
            color: "white",
            fontSize: "30px",
            marginTop: "10px",
            fontFamily: "sans-serif",
            width: "80%",
            textAlign: "center",
          }}
        >
          {loggedInUser.info.fullName}
        </h1>
        <h5
          style={{
            color: "white",
            marginTop: "10px",
            fontFamily: "sans-serif",
          }}
        >
          {loggedInUser.email}
        </h5>
        <p
          style={{
            color: "white",
            opacity: "0.7",
            textAlign: "center",
            width: "80%",
            marginTop: "10px",
          }}
        >
          This is your year to smile bright!
        </p>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.settings}>
          <div className={classes.email}>
            <div style={{ display: "flex" }}>
              <h6 className={classes.h6}>CHANGE EMAIL</h6>
              <EditIcon color="primary" />
            </div>
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
              className={classes.input}
              id="outlined-basic"
              label="Enter new email"
              variant="outlined"
              size="small"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            />

            <Button
              className={classes.button}
              variant="outlined"
              onClick={changeEmail}
            >
              Change
            </Button>
          </div>
          <div className={classes.password}>
            <div style={{ display: "flex" }}>
              <h6 className={classes.h6}>CHANGE PASSWORD</h6>
              <EditIcon color="primary" />
            </div>
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
              className={classes.input}
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

            <Button
              className={classes.button}
              variant="outlined"
              onClick={changePassword}
            >
              Change
            </Button>
          </div>
        </div>
        <div className={classes.history}>
          <div>
            <h4
              style={{
                color: "#2D4262",
                letterSpacing: "3px",
                textAlign: "center",
              }}
            >
              BOOKING HISTORY
            </h4>
            <p style={{ textAlign: "center", color: "#006C84" }}>
              nothing to show
            </p>
          </div>
          <div className={classes.tooth}>
            <img
              alt="icon"
              src="http://localhost:3000/images/kisspng-tooth.png"
              width="5%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
