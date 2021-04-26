import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "gray",
  },
  tabs: {
    margin: "auto",
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
        <Tab label="Sign Up" {...a11yProps(6)} component={Link} to="/signup" />
        <Tab label="Sign Out" {...a11yProps(7)} component={Link} to="/" />
      </Tabs>
    </AppBar>
  );
}

export default Nav;
