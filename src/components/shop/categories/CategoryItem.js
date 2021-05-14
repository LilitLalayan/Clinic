// react imports
import React from "react";
import { useState, useEffect } from "react";

// material ui imports
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { storage } from "../../../index";

// material ui styles
const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    
  },
  media: {
    height: 0,
  },

  
});

function CategoryItem({id,title,handleClick}) {
  const [url, setUrl] = useState("");
  const classes = useStyles();
//   useEffect(() => {
    
//     var storageRef = storage.ref(`shop/CategoriesMain/img${index}.jpg`);
// storageRef.getDownloadURL().then(function(url) {
//   console.log(url);
//   setUrl(url)
// });
//   },);


  return (
    <Grid item xs={3}>
      <Card className={classes.root} onClick={handleClick} elevation={4}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image={url}
            title={title}
          />
           <CardContent>
          <Typography gutterBottom variant="body2" component="h2" align="center">
            {title}
          </Typography>
          
        </CardContent>
        </CardActionArea>  
      </Card>
    </Grid>
  );
}

export default CategoryItem;
