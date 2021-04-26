import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DocImage1 from "./DoctorsImages/DocImg1.jpg";
import DocImage2 from "./DoctorsImages/DocImg2.jpg";
import DocImage3 from "./DoctorsImages/DocImg3.jpg";
import DocImage4 from "./DoctorsImages/DocImg4.jpg";
import DocImage5 from "./DoctorsImages/DocImg5.jpg";
import DocImage6 from "./DoctorsImages/DocImg6.jpg";

import { db } from "..";
import { Container, Grid } from "@material-ui/core";

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
});

export default function Doctors() {
  const classes = useStyles();

  const [allDocotors, setAllDoctors] = useState([]);
  console.log(allDocotors);
  useEffect(() => {
    const doctorsRef = db.collection("doctors");
    doctorsRef.get().then((querySnapShot) => {
      const data = [];
      querySnapShot.forEach((asd) => {
        data.push(asd.data());
      });
      setAllDoctors(data);
    });
  }, []);

  return (
    <div>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid className={classes.gridItem}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={DocImage1}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dr. Levon Asatryan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    some text some text some text some text some text some text
                    some text some text some text some text some text some text
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  make an appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.gridItem}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={DocImage2}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dr. Tatev Sahakyan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    some text some text some text some text some text some text
                    some text some text some text some text some text some text
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  make an appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.gridItem}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={DocImage3}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dr. Ani Margaryan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    some text some text some text some text some text some text
                    some text some text some text some text some text some text
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  make an appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.gridItem}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={DocImage4}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dr. Lilit Galstyan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    some text some text some text some text some text some text
                    some text some text some text some text some text some text
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  make an appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.gridItem}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={DocImage5}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dr. Narek Petrosyan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    some text some text some text some text some text some text
                    some text some text some text some text some text some text
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  make an appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.gridItem}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={DocImage6}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Dr. Alen Markosyan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    some text some text some text some text some text some text
                    some text some text some text some text some text some text
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  make an appointment
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
