import React from "react";
import "./Contacts.css";
import ContactsAddress from "./ContactsAddress";
import ContactsWorkingHours from "./ContactsWorkingHours";
import ContactsSimpleMap from "./ContactsSimpleMap";
import "@fontsource/roboto";
import "./Contacts.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";
import MuiAlert from "@material-ui/lab/Alert";

import {
  fade,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { useState } from "react";
import { db } from "../..";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Icon } from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  input: {
    borderColor: "green",
  },
  contactsInput: {
    border: "1px solid #777 !important",
    outline: "1px solid #777 !important",
    width: "80%",
    display: "block",
    margin: "20px auto",
    padding: "15px 15px",
    borderRadius: "10px",
    outline: "none",
  },

  submit: {
    width: "30%",
    background: "#60BFE6",
  },

  label: {
    textAlign: "center",
    display: "block",
    fontSize: "18px",
    fontWeight: "200",
    margin: "0 auto",
  },

  success: {
    borderColor: "green !important",
    outline: "1px solid green !important",
    "&:focus": {
      border: "1px solid green !important",
      outline: "none",
    },
  },

  error: {
    border: "1px solid red !important",
    outline: "1px solid red !important",
    "&:focus": {
      border: "1px solid red !important",
      outline: "none",
    },
  },

  gridContainer: {
    marginTop: "20px",
    height: "80vh",
  },

  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  gridItem: {
    color: "#fff",
    height: "100%",
    backgroundColor: "#fff",
    padding: "40px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    ["@media (min-width:960px)"]: {
      // eslint-disable-line no-useless-computed-key
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: "40px auto 100px",
    background: "#60BFE6 !important",
    width: "70% !important",
    borderRadius: "10px !important",
    color: "#fff !important",
  },

  snackbar: {},

  contactsInfo: {
    marginTop: "60px !important",
  },
}));

function Contacts() {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [alrt, setAlrt] = useState({
    msg: "",
    severity: "",
  });

  const [validationState, setValidationState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    additionalDetails: "",
  });
  const [contactUsData, setContactUsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    additionalDetails: "",
  });

  const onBtnClick = async (event) => {
    event.preventDefault();
    try {
      const docRef = await db
        .collection("contact-us-data")
        .doc("contact-us-data: " + contactUsData.email)
        .set(contactUsData);
      await setAlrt({
        msg: "Your message sent. We contact to you soon",
        severity: "info",
      });
    } catch (e) {
      setAlrt({
        msg: "Sorry unable to sent. try later",
        severity: "danger",
      });
    } finally {
      setOpenAlert(true);
    }
  };

  const onChange = (e) => {
    let id = e.target.id;

    let value = e.target.value;
    setContactUsData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    validate(e.target.id, value);
  };

  const validate = (id, value) => {
    switch (id) {
      case "email": {
        const regex = /^[a-zA-Z0-9]*@[a-zA-Z]*\.[a-z]*$/;
        if (regex.test(value)) {
          setValidationState({
            ...validationState,
            email: "success",
          });
        } else {
          setValidationState({
            ...validationState,
            email: "error",
          });
        }
        break;
      }

      case "firstName": {
        const regex = /^([a-zA-Z]){1,15}$/;
        if (regex.test(value)) {
          setValidationState({
            ...validationState,
            firstName: "success",
          });
        } else {
          setValidationState({
            ...validationState,
            firstName: "error",
          });
        }
        console.log();
        break;
      }

      case "lastName": {
        const regex = /^([a-zA-Z]){1,15}$/;
        if (regex.test(value)) {
          setValidationState({
            ...validationState,
            lastName: "success",
          });
        } else {
          setValidationState({
            ...validationState,
            lastName: "error",
          });
        }
        console.log();
        break;
      }

      case "message": {
        const regex = /^(.){10,150}$/g;
        if (regex.test(value)) {
          setValidationState({
            ...validationState,
            message: "success",
          });
        } else {
          setValidationState({
            ...validationState,
            message: "error",
          });
        }
        console.log();
        break;
      }

      case "additionalDetails": {
        const regex = /(.*){1,50}$/;
        if (regex.test(value)) {
          setValidationState({
            ...validationState,
            additionalDetails: "success",
          });
        } else {
          setValidationState({
            ...validationState,
            additionalDetails: "error",
          });
        }

        break;
      }
    }
  };

  const handleFocusOut = (e) => {
    // let value = e.target.value;
    // switch (e.target.id) {
    //   case "email": {
    //     const regex = /^[a-zA-Z0-9]*@[a-zA-Z]*\.[a-z]*$/;
    //     if (regex.test(value)) {
    //     } else {
    //     }
    //     break;
    //   }
    //   case "firstName": {
    //     const regex = /^([a-zA-Z]){1,15}$/;
    //     if (regex.test(value)) {
    //     } else {
    //     }
    //     console.log();
    //     break;
    //   }
    //   case "lastName": {
    //     const regex = /^([a-zA-Z]){1,15}$/;
    //     if (regex.test(value)) {
    //     } else {
    //     }
    //     console.log();
    //     break;
    //   }
    //   case "message": {
    //     const regex = /^(.){10,150}$/g;
    //     if (regex.test(value)) {
    //     } else {
    //     }
    //     console.log();
    //     break;
    //   }
    //   case "additionalDetails": {
    //     const regex = /(.*){1,50}$/;
    //     if (regex.test(value)) {
    //     } else {
    //     }
    //     console.log();
    //     break;
    //   }
    // }
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  console.log(validationState);

  return (
    <div className="contacts">
      <Container fixed>
        <CssBaseline />
        <h2
          className="contact-us__title"
          style={{ fontSize: "30px", textAlign: "center" }}
        >
          Contact Us
        </h2>
        <div className={classes.paper}>
          {/* <Typography component="h1" variant="h5">
          Contact Us
        </Typography> */}
          <Paper elevation={10} style={{ padding: "40px" }}>
            <Grid container justify="space-between">
              <Grid item sm={5}>
                <form className={classes.form} noValidate>
                  {/* <Grid item sx={12}>
                      <CssTextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                        className={classes[validationState.lastName]}
                      />
                    </Grid> */}

                  {/* <Grid item xs={12}>
                      <CssTextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                  
                    <Grid item xs={12}>
                      <CssTextField
                        id="message"
                        label="Message *"
                        multiline
                        fullWidth
                        rows={2}
                        
                        variant="outlined"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <CssTextField
                        id="additionalDetails"
                        label="Additional Details"
                        multiline
                        fullWidth
                        rows={4}
                        variant="standard"
                        required
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid> */}

                  <Grid container>
                    <Grid item="" xs={12} display="flex" flexDirection="column">
                      <label className={classes.label} htmlFor="firstName">
                        First Name
                      </label>

                      <input
                        className={
                          classes[validationState.firstName] +
                          " " +
                          classes.contactsInput
                        }
                        type="text"
                        id="firstName"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                    <Grid
                      item=""
                      xs={12}
                      flexDirection="column"
                      className={classes.inputWrapper}
                    >
                      <label
                        className={classes.label}
                        htmlFor=""
                        htmlFor="lastName"
                        cl
                      >
                        Last Name
                      </label>
                      <input
                        className={
                          classes[validationState.lastName] +
                          " " +
                          classes.contactsInput
                        }
                        type="text"
                        id="lastName"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                    <Grid
                      item=""
                      xs={12}
                      flexDirection="column"
                      className={classes.inputWrapper}
                    >
                      <label className={classes.label} htmlFor="email">
                        Email
                      </label>

                      <input
                        className={
                          classes[validationState.email] +
                          " " +
                          classes.contactsInput
                        }
                        type="email"
                        id="email"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                    <Grid item="" xs={12} flexDirection="column">
                      <label className={classes.label} htmlFor="message">
                        Message
                      </label>

                      <textarea
                        className={
                          classes[validationState.message] +
                          " " +
                          classes.contactsInput
                        }
                        type=""
                        id="message"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                    <Grid
                      item=""
                      xs={12}
                      flexDirection="column"
                      className={classes.inputWrapper}
                    >
                      <label
                        className={classes.label}
                        htmlFor="additionalDetails"
                      >
                        Additional Details
                      </label>

                      <textarea
                        className={
                          classes[validationState.additionalDetails] +
                          " " +
                          classes.contactsInput
                        }
                        type=""
                        id="additionalDetails"
                        onChange={onChange}
                        onBlur={handleFocusOut}
                      />
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outline"
                      color="primary"
                      style={{ background: "#D09683" }}
                      className={classes.submit}
                      onClick={onBtnClick}
                    >
                      Send Message
                    </Button>

                    <Snackbar
                      open={openAlert}
                      message={alrt.msg}
                      autoHideDuration={5000}
                      onClose={handleClose}
                      action={
                        <div className={classes.snackbar}>
                          <IconButton onClick={handleClose} aria-label="close">
                            <CloseIcon />
                          </IconButton>
                        </div>
                      }
                    >
                      <Alert severity={alrt.severity}>
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpenAlert(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                        {alrt.msg}
                      </Alert>
                    </Snackbar>
                  </Grid>

                  {/* </Grid> */}
                </form>
              </Grid>

              <Grid item sm={5} className={classes.contactsInfo}>
                <Grid container>
                  <Grid item xs={12}>
                    <ContactsWorkingHours />
                  </Grid>
                  <Grid item xs={12}>
                    <ContactsAddress />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="contacts__map">
                      <ContactsSimpleMap />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container justify="center"></Grid>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default Contacts;

{
  /* <Container fixed >
      
    </Container> */
}
