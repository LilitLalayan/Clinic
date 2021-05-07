import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "..";
import { Button, CardActions, Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Doctor from "./Doctor";
import "@fontsource/roboto";
import { useSelector } from "react-redux";
import { selectLoggedinUser } from "../reducers/selectors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    paddingBottom: "130px",
  },
  typography: {
    margin: "60px 60px",
    textAlign: "center",
    color: "gray",
    background: `linear-gradient(gray, gray) center bottom / 185px 3px no-repeat`,
    paddingBottom: "20px",
    paddingTop: "20px",
  },
  forButton: {
    paddingBottom: "60px",
    paddingTop: "10px",
  },
});

export default function Doctors() {
  const classes = useStyles();
  const loggedInUser = useSelector(selectLoggedinUser);
  const [allDocotors, setAllDoctors] = useState([]);

  console.log(allDocotors, 1);
  useEffect(() => {
    // retrieving doctors data from firebase-database
    const doctorsRef = db.collection("doctors");
    doctorsRef.get().then((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((snapShotData) => {
        data.push(snapShotData.data());
      });
      setAllDoctors(data);
    });
  }, []);

  const book = () => {
    if (loggedInUser) {
      return;
    } else {
      alert("Please sign in!");
    }
  };

  return (
    <div className={classes.div}>
      <Container className={classes.cardGrid}>
        <Typography className={classes.typography} component="h4" variant="h3">
          Our Doctors
        </Typography>
        <Grid
          container
          className={classes.forButton}
          spacing={3}
          justify="center"
        >
          <Grid item>
            <Link to="/booking" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" onClick={book}>
                make an appointment
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.container} spacing={4}>
          {allDocotors.map((doctor, index) => {
            return (
              <Doctor doctor={doctor} key={doctor.uid} index={index + 1} />
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
