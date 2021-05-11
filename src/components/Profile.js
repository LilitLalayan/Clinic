import React, { useEffect, useState } from "react";
import { TextField, Button, makeStyles, withStyles } from "@material-ui/core";
import { auth, db, storage } from "..";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGGEDIN_USER } from "../actions/actions";
import { selectLoggedinUser } from "../reducers/selectors";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "../styles/profile.css";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
  },
  sidebar: {
    width: "20%",
    height: "92.4vh",
    backgroundColor: "#60bfe6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTop: "1px solid white",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "90vh",
    alignItems: "center",
    justifyContent: "space-around",
  },
  carousel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
    height: "30vh",
    border: "1px solid #3f51b5",
    borderRadius: "3px",
  },
  history: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "50vh",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #3f51b5",
    borderRadius: "3px",
    opacity: "0.7",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  orders: {
    width: "70%",
    height: "35vh",
    backgroundColor: "white",
    borderRadius: "3px",
    border: "1px solid #3f51b5",
  },
  allorders: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "scroll",
    height: "25vh",
    marginTop: "20px",
    color: "#3f51b5",
    fontSize: "17px",
    fontFamily: "sans-serif",
    paddingTop: "10px",
  },
  email: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  password: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: "10px",
    width: "90%",
  },
  button: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "90%",
    backgroundColor: "#3f51b5",
    color: "white",
  },
  icon: {
    color: "white",
    fontSize: "200px",
    [theme.breakpoints.down(950)]: {
      fontSize: "150px",
    },
    [theme.breakpoints.down(670)]: {
      fontSize: "100px",
    },
  },
  dialog: {
    height: "50vh",
    width: "70vh",
    margin: "auto",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: "50vh",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function Profile() {
  const loggedInUser = useSelector(selectLoggedinUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    storage
      .ref()
      .child(`ProfilePage/3601715.jpg`)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  useEffect(() => {
    const ordersRef = db.collection("orders");
    ordersRef.get().then((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((order) => {
        data.push(order.data());
      });
      setOrders(data.filter((o) => o.userId === loggedInUser.uid));
    });
  }, [loggedInUser.uid]);

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  const changeEmail = () => {
    reauthenticate(currentPassword)
      .then(() => {
        const user = auth.currentUser;
        user
          .updateEmail(newEmail)
          .then(function () {
            alert("You have successfully changed your email");
            dispatch({
              type: SET_LOGGEDIN_USER,
              user: {
                ...loggedInUser,
                email: newEmail,
              },
            });
            setCurrentPassword("");
            setNewEmail("");
            handleClose();
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
      <div className={classes.sidebar}>
        <AccountCircleIcon className={classes.icon} />
        <h2
          style={{
            fontFamily: "sans-serif",
            color: "white",
            fontSize: "25px",
            width: "80%",
            textAlign: "center",
          }}
        >
          {loggedInUser.info.fullName}
        </h2>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "sans-serif",
              color: "#3f51b5",
              marginRight: "5px",
            }}
          >
            {loggedInUser.email}
          </p>
          <span>
            <EditIcon
              style={{
                color: "#3f51b5",
                fontSize: "20",
                cursor: "pointer",
              }}
              onClick={handleClickOpen}
            />
          </span>
        </div>
        <Dialog
          className={classes.dialog}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Change Email
          </DialogTitle>

          <div className={classes.email}>
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Enter current password"
              type="password"
              variant="outlined"
              size="small"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
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
        </Dialog>

        <p
          style={{
            fontFamily: "sans-serif",
            color: "white",
            marginTop: "40px",
            width: "70%",
            textAlign: "center",
            letterSpacing: "3px",
          }}
        >
          This is your year to smile bright!
        </p>
        <FilterVintageIcon style={{ color: "white", fontSize: "50" }} />
      </div>
      <div className={classes.info}>
        <div className={classes.carousel}>
          <div className="content-slider">
            <div className="slider">
              <div className="mask">
                <ul>
                  <li className="anim1">
                    <div className="quote">
                      The average person spends 38 days brushing their teeth
                      during their lifetime.
                    </div>
                  </li>
                  <li className="anim2">
                    <div className="quote">
                      Tooth enamel is the hardest part of the entire body; even
                      harder than bone.
                    </div>
                  </li>
                  <li className="anim3">
                    <div className="quote">
                      One third of your teeth are underneath your gums.
                    </div>
                  </li>
                  <li className="anim4">
                    <div className="quote">
                      No two people have the same set of teeth; they are as
                      unique as your fingerprint.
                    </div>
                  </li>
                  <li className="anim5">
                    <div className="quote">
                      Teeth are the only part of the human body that can’t
                      repair itself. They are coated in enamel, which is not a
                      living tissue.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {url && (
          <div
            className={classes.history}
            style={{ backgroundImage: `url(${url})` }}
          >
            <div className={classes.orders}>
              <h4
                style={{
                  marginTop: "10px",
                  color: "purple",
                  textAlign: "center",
                  letterSpacing: "3px",
                  fontFamily: "sans-serif",
                }}
              >
                History of ordered services
              </h4>
              <div className={classes.allorders}>
                {orders
                  ? orders.map((o, index) => {
                      return (
                        <p key={index}>{`${o.date.toDate().toDateString()}, ${
                          o.serviceName
                        }, ${o.doctorName}`}</p>
                      );
                    })
                  : "Nothing to show"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
