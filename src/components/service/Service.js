import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { storage } from "../..";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Service = ({ service, index }) => {
  const classes = useStyles();
  const [doctors, setDoctors] = useState([]);
  console.log(doctors);

  const [url, setUrl] = useState("");

  storage
    .ref()
    .child(`/servicesImg/ServiceImg${index}.jpg`)
    .getDownloadURL()
    .then((url) => {
    
      setUrl(url);
    })
    .catch((error) => {
    
    });

  useEffect(async () => {
    if (service.doctors && service.doctors.length) {
      const d = await Promise.all(service.doctors.map((d) => d.get()));
      const res = d.map((d) => d.data());
      console.log(res);
      setDoctors(res);
  
    }
  }, [service]);

  return (
    <>
      <Grid item key={service.id} xs={16} sm={9} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={url}
            title={service.name}
          />
          <CardContent className={classes.cardContent}>
            <CardActionArea>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}
              >
                {service.name}
              </Typography>
              <Typography>{service.description}</Typography>
              <div style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
                {doctors.map((d) => (
                  <div>{d.name}</div>
                ))}
              </div>
            </CardActionArea>
          </CardContent>
          <CardActions
            style={{
              textAlign: "center",
              backgroundColor: "#3f51b5",
              color: "white",
            }}
          >
            <div>PRICE: {service.price} dram</div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Service;
