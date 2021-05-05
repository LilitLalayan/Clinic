import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "..";
import { Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Doctor from "./Doctor";
import "@fontsource/roboto";

const useStyles = makeStyles({
  // root: {
  //   boxShadow: "2px 2px 20px	paleturquoise	",
  //   paddingBottom: "150px",
  // },
  // media: {
  //   height: 175,
  //   backgroundSize: "cover",
  // },
  // gridItem: {
  //   margin: 50,
  //   height: 300,
  //   maxWidth: 320,
  // },
  container: {
    paddingBottom: "130px",
  },
  // div: {
  //   margin: "200px",
  // },
});

export default function Doctors() {
  const classes = useStyles();

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

  return (
    <div className={classes.div}>
      <Container className={classes.cardGrid}>
        <Typography
          component="h4"
          variant="h3"
          style={{
            margin: "60px 60px",
            textAlign: "center",
            color: "grey",
            // textDecoration: "underline",
            // textDecorationColor: "#73605B",
            // textDecorationStyle: "solid",
            // textDecorationThickness: "3px",
            //style={{background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`}}
            // position: "center bottom",
            background: `linear-gradient(gray, gray) center bottom / 185px 3px no-repeat`,
            paddingBottom: "20px",
            paddingTop: "20px",
          }}
        >
          Our Doctors
        </Typography>
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
