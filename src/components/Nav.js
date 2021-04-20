import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Nav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        centered
      >
        <Link to="/home">
          <Tab label="Home" />
        </Link>
        <Link to="/about">
          <Tab label="About" />
        </Link>
        <Link to="/services">
          <Tab label="Services" />
        </Link>
        <Link to="/doctors">
          <Tab label="Our Doctors" />
        </Link>
        <Link to="/contacts">
          <Tab label="Contacts" />
        </Link>
        <Link to="/auth">
          <Tab label="Sign In/Sign Up" />
        </Link>
      </Tabs>
    </Paper>
  );
}

export default Nav;
