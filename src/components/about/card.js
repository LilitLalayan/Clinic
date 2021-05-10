import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Teame from '../about/Teame.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const cardStyle = {
    right: '4%',
    top: '52%',
    position: 'absolute',
   
    padding: '20px', 
  }


  
export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
         
          height="140"
          img src={Teame} width="550" height="350" alt="teame" 
          title="Smile teame"
        />
      </CardActionArea>
     
    </Card>
  );

}


