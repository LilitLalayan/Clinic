import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/StarRate";
import Grid from "@material-ui/core/Grid";
import { StylesProvider } from "@material-ui/core/styles";
import "./ShopStyles.css"
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    "&$img" : {
      backgroundSize: "80% !important"
    }
  },

  typography : {
    marginBottom: "15px"
  },

  grid: {
    marginBottom: "15px"
  },

  MuiCardMediaRoot: {
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },

  control: {
    padding: theme.spacing(2),
  },
}));

export default function ShoppingItem({
  title,
  imageUrl,
  price,
  popularity,
  date,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const couuntOfStars = +popularity
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StylesProvider>
      <Grid item md={3} className={classes.center}>
      <Card className={classes.root} elevation="3">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Paella dish"
      />
      <CardContent>
        <Typography className={classes.typography} variant="body2" color="textSecondary" component="p">
        Price {`${price}`}
        </Typography>
        <Grid container className={classes.grid}>
          {new Array( popularity).fill(0).map((star) => {
            return (<StarIcon />);
          })}
        </Grid>
        <Typography variant="body2" className={classes.typography}> Added {`${date}`}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Remove">
          <RemoveIcon />
        </IconButton>
        <IconButton aria-label="Add">
          <AddIcon />
        </IconButton>
        <IconButton aria-label="Add to basket" >
        <Link to="/basket" style={{ textDecoration: "none" }}>
           Go to Basket
        </Link>
        </IconButton>
      </CardActions>
    </Card>
    </Grid>
    </StylesProvider>
    
    
  );
}