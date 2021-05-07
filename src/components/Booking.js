
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { db } from "..";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Booking() {
  const classes = useStyles();

  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    datetimeLocal: "",
  });

  const onBtnClick = async (event) => {
    event.preventDefault();

    try {
      const docRef = await db
        .collection("booking-data")
        .doc(`booking-data ${bookingData.email}`)
        .set(bookingData);
    } catch (error) {}
  };

  const onChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    setBookingData((oldState) => ({
      ...oldState,
      [id]: value,
    }));
  };

  console.log(bookingData);




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={20}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h4" style={{ textAlign: "left" }}>
            Book Now
          </Typography>
          <br />
          <form className={classes.form} noValidate>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  // variant="filled"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  // variant="filled"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  // variant="filled"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                id="datetimeLocal"
                label="Choose Date"
                type="datetime-local"
                defaultValue="2021-04-29T19:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onBtnClick}
            >
              BOOK NOW
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
