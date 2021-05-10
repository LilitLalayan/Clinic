import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useState, useRef } from "react";
import { Height } from "@material-ui/icons";
import { StylesProvider } from "@material-ui/core/styles";
import "./ShopStyles.css"
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper"
import {db} from "../.."

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} timeout={4,4, 4, 4} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  basket : {
    width: "60%",
    Height: "600px"
  },

  avatar: {
    
  },
  large: {
    width: "200px",
    height: "200px"
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  large: {
    width: "100px",
    height: "100px"
  },

  link: {
    color: "red"
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Basket({
  allShoppingItems,
  handleItemAddRemove,
  basketOpen,
  basket,
  handleBasketDialogOpen,
  handleBasketDialogClose,
}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const allTotalPrice = useRef({
    total: 0
  })
  const [openAlert, setOpenAlert] = useState(false);
  const [alrt, setAlrt] = useState({
    msg: "",
    severity: "",
  });
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const showBasketItems = () => {
    const ShopListItems = [];
    const allTotal = 0;

    
        return Object.keys(basket).map((key,index) => {
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Avatar variant="rounded" className={classes.large} src={basket[key].imageUrl}></Avatar>
              </TableCell>
              <TableCell align="right">{basket[key].title}</TableCell>
              <TableCell align="right">{basket[key].quantity}</TableCell>
              <TableCell align="right">{Number.parseInt(basket[key].price) * basket[key].quantity}</TableCell>
              <TableCell align="right"><RemoveIcon onClick={(e) => handleItemAddRemove(e,"decrement",key,basket[key].imageUrl,basket[key].title,basket[key].price)}/></TableCell>
              <TableCell align="right"><AddIcon onClick={(e) => handleItemAddRemove(e,"increment",key,basket[key].imageUrl,basket[key].title,basket[key].price)}/></TableCell>

            </TableRow>
          )
        })

        
          
         
        
      
    
    allTotalPrice.current.total = allTotal;
    return ShopListItems
  };

  const handleCheckoutClick = async (event) => {
    event.preventDefault();
    try {
      const docRef = await db
        .collection("shopping-payments")
        .doc("shopping-payment: " + 1)
        .set(basket);
      await setAlrt({
        msg: "Happy Shopping",
        severity: "info",
      });
    } catch (e) {
      setAlrt({
        msg: "Sorry unable to checkout. try later",
        severity: "danger",
      });
    } finally {
      setOpenAlert(true);
    }
  } 
  

  return (
    <div>
      <StylesProvider>
      <Dialog
         TransitionComponent={Transition}
        className="basket"
        onClose={handleBasketDialogClose}
        aria-labelledby="customized-dialog-title"
        open={basketOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleBasketDialogClose}
        >
          My orders
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {/* <List dense className={classes.root}>
              {showBasketItems()}
            </List> */}


          </Typography>
          <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Remove</TableCell>
            <TableCell align="right">Add</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {showBasketItems()}
        </TableBody>
      </Table>
    </TableContainer>
        </DialogContent>
        <DialogActions>
          <Typography variant="h6">All Total {allTotalPrice.current.total}</Typography>
          <Button autoFocus onClick={handleBasketDialogClose} color="primary">
            <Button onClick={handleCheckoutClick} className="">
              Checkout
            </Button>
          </Button>
        </DialogActions>
      </Dialog>
      </StylesProvider>
      
    </div>
  );
}
