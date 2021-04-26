import  React, { useEffect, useState }  from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import firebase from "firebase";
import {db} from "../index"
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
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));



const Service = ({service}) => {
    const classes =useStyles();
    const [doctors, setDoctors] = useState([])
    console.log(doctors) 

useEffect(async()=>{
	if (service.doctors && service.doctors.length) {
        const d = await Promise.all(service.doctors.map(d => d.get()))
        const res = d.map(d => d.data())
        console.log(res)
    setDoctors(res)
        //service.doctors[0].get().then(d => {
       //     console.log(d.data())
       // })

        //const d = await Promise.all(service.doctors.map(d => d.get()))
        //console.log(d)
	  // setDoctors(d.map(d => d.data()))
    }
}, [service])


    return (
        <> 
        
    <Grid item key={service.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title={service.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
          {service.name}
          </Typography>
          <Typography>
          {service.description}
          </Typography>
          {doctors.map(d => <div>{d.name}</div>)}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  
 </>
    )
}

  export default Service;