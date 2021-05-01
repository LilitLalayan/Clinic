import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "..";
import { Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Doctor from "./Doctor";

const useStyles = makeStyles({
  root: {
    boxShadow: "2px 2px 20px	paleturquoise	",
  },
  media: {
    height: 175,
    backgroundSize: "cover",
  },
  gridItem: {
    margin: 50,
    height: 300,
    maxWidth: 320,
  },
  // asdd: {
  //   // backgroundImage: `url("https://image.freepik.com/free-vector/dentist-medical-background-with-3d-tooth-design_1017-26095.jpg")`,
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
    <div className={classes.asdd}>
      <Container className={classes.cardGrid}>
        {/* <Typography
          component="h4"
          variant="h3"
          style={{
            margin: "10px 10px",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Our Doctors
        </Typography> */}
        <Grid container spacing={4}>
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
