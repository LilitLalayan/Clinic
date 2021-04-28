import React from "react";
import "../styles/Auth.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { auth } from "..";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const signOut = () => {
  auth.signOut();
  console.log("out");
  const signout = document.querySelector(".signout");
  const icon = document.querySelector(".icon");
  icon.style.display = "none";
  signout.style.display = "none";
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "gray",
    display: "flex",
    width: "100%",
  },
  tabs: {
    margin: "auto",
    width: "90%",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: "auto",
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function visible() {
  const signout = document.querySelector(".signout");
  if (signout.style.display === "none") {
    signout.style.display = "block";
  } else {
    signout.style.display = "none";
  }
}

function Nav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab label={"Home"} {...a11yProps(0)} component={Link} to="/" />
        <Tab label="About" {...a11yProps(1)} component={Link} to="/about" />
        <Tab
          label="Services"
          {...a11yProps(2)}
          component={Link}
          to="/services"
        />
        <Tab
          label="Our Doctors"
          {...a11yProps(3)}
          component={Link}
          to="/doctors"
        />
        <Tab
          label="Contacts"
          {...a11yProps(4)}
          component={Link}
          to="/contacts"
        />
        <Tab label="Sign In" {...a11yProps(5)} component={Link} to="/signin" />
      </Tabs>
      <AccountCircleIcon
        className="icon"
        style={{ cursor: "pointer" }}
        fontSize="large"
        onClick={visible}
      />
      <div className="signout" onClick={signOut}>
        Log out
      </div>
    </AppBar>
  );
}

export default Nav;
