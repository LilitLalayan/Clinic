import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import { db, storage } from "..";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { AVAILABLE_ORDER_TIMES } from "../constants/appConstants";
import { useSelector } from "react-redux";
import { selectLoggedinUser } from "../reducers/selectors";
import "@fontsource/roboto";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    height: "80vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    height: "80vh",
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    color: "white",
    backgroundColor: "#3f51b5",
    borderRadius: "10px",
    minWidth: 300,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  datePicker: {
    paddingLeft: "23px",
    paddingTop: "15px",
    paddingBottom: "20px",
  },
  forSnackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
    paddingBottom: "70px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Booking() {
  const classes = useStyles();

  const loggedInUser = useSelector(selectLoggedinUser);
  const [allDoctors, setAllDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [orderTime, setOrderTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isTimeDisabled, setIsTimeDisabled] = useState(false);

  useEffect(() => {
    // retrieving doctors data from firebase-database
    const doctorsRef = db.collection("doctors");
    doctorsRef.get().then((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((snapShotData) => {
        data.push({
          ...(snapShotData.data() || {}),
          id: snapShotData.id,
        });
      });
      setAllDoctors(data);
    });
  }, []);

  useEffect(() => {
    const servicesRef = db.collection("services");
    servicesRef.get().then((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((asd) => {
        data.push({
          ...(asd.data() || {}),
          id: asd.id,
        });
      });
      setServices(data);
    });
  }, []);

  useEffect(() => {
    setIsTimeDisabled(true);
    if (selectedDoctor && orderDate) {
      const orderRef = db
        .collection("orders")
        .where("doctorId", "==", selectedDoctor.id);
      orderRef
        .get()
        .then((querySnapShot) => {
          const data = [];
          querySnapShot.forEach((asd) => {
            data.push(asd.data());
          });
          setAvailableTimes(
            data
              .filter(
                (t) =>
                  t.date.toDate().toDateString() ===
                  new Date(orderDate).toDateString()
              )
              .map((t) => t.time)
          );
        })
        .finally(() => {
          setIsTimeDisabled(false);
        });
    }
  }, [selectedDoctor, orderDate]);

  const onSubmitOrder = async (event) => {
    setOpen(true);
    event.preventDefault();
    try {
      const docRef = await db
        .collection("orders")
        .doc()
        .set({
          userId: loggedInUser.uid,
          date: new Date(orderDate),
          doctorId: selectedDoctor.id,
          serviceId: selectedService.id,
          time: orderTime,
        });
    } catch (error) {}
  };

  const onOrderDateChange = (event) => {
    setOrderDate(event.target.value);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "#3f51b5" }}
    >
      <CssBaseline />
      <Paper elevation={20}>
        <div className={classes.paper}>
          <Typography
            variant="h5"
            style={{ textAlign: "left", color: "#3f51b5" }}
          >
            FILL IN THE FORM
          </Typography>
          <br />
          <form className={classes.form} noValidate>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Doctors</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                >
                  <MenuItem key={-1} index={-1} value="">
                    None
                  </MenuItem>
                  {allDoctors
                    .filter(
                      (d) =>
                        !selectedService ||
                        selectedService.doctors.some((sS) => sS.id === d.id)
                    )
                    .map((doctor, index) => {
                      return (
                        <MenuItem key={index} index={index} value={doctor}>
                          {doctor.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Services</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedService}
                  onChange={handleServiceChange}
                >
                  <MenuItem key={-1} index={-1} value="">
                    None
                  </MenuItem>
                  {services
                    .filter(
                      (s) =>
                        !selectedDoctor ||
                        s.doctors.some((sS) => sS.id === selectedDoctor.id)
                    )
                    .map((service, index) => {
                      return (
                        <MenuItem key={index} index={index} value={service}>
                          {service.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <Grid item xs={12} className={classes.datePicker}>
              <TextField
                id="date"
                label="Choose Date"
                type="date"
                defaultValue="2017-05-24"
                value={orderDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onOrderDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Choose Time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderTime}
                  disabled={isTimeDisabled}
                  onChange={(e) => setOrderTime(e.target.value)}
                >
                  {AVAILABLE_ORDER_TIMES.filter(
                    (time) => !availableTimes.includes(time.value)
                  ).map((time) => {
                    return (
                      <MenuItem key={time.value} value={time.value}>
                        {time.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                !selectedDoctor || !selectedService || !orderDate || !orderTime
              }
              onClick={onSubmitOrder}
            >
              SUBMIT
            </Button>
            <Link to="/Home">
              <Snackbar
                className={classes.forSnackbar}
                open={open}
                // autoHideDuration={2800}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  You successfully scheduled an appointment !
                </Alert>
              </Snackbar>
            </Link>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
