import React from "react";
import "./Nav.css";
import Navbar from "./Navbar";
import classNames from "classnames";
import HamburgerIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSelector } from "react-redux";
import { auth } from "../..";
import { selectLoggedinUser } from "../../reducers/selectors";
import { makeStyles } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  appear: {
    position: "absolute",
    width: "27vh",
    fontSize: "18px",
    height: "23vh",
    zIndex: "2",
    backgroundColor: "white",
    color: "gray",
    borderRadius: "3px",
    paddingTop: "5px",
    textAlign: "center",
    display: "block",
    right: "5vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid gray",
  },
  disappear: {
    display: "none",
  },
  icon: {
    "&:hover": {
      border: "2px solid white",
      borderRadius: "50%",
    },
  },
  profile: {
    color: "gray",

    "&:hover": {
      textDecoration: "none",
      color: "gray",
    },
  },
}));

function Nav() {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const loggedInUser = useSelector(selectLoggedinUser);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navSwitcher, setNavSwitcher] = useState("closed-nav");
  const [displayFlex, setDisplayFlex] = useState("");
  const [brandFlexOrder, setBrandFlexOrder] = useState("");
  const [hamburgerFlexOrder, setHamburgerFlexOrder] = useState("");
  const [loginOrder, setLoginOrder] = useState("");
  const [navAnimation, setNavAnimation] = useState("");
  const [flexDirection, setFlexDirection] = useState("");
  const [paddingX, setPaddingX] = useState("");
  const [marginBottom, setMarginBottom] = useState("");

  return (
    <nav
      className={classNames(
        "custom-nav",
        "custom-box-shadow-thin",
        paddingX,
        navAnimation,
        navSwitcher,
        flexDirection,
        "icon"
      )}
    >
      <Link
        to="/home"
        className={classNames("nav__brand", brandFlexOrder, marginBottom)}
      >
        Smile Clinic
      </Link>

      <Navbar displayFlex={displayFlex} />

      {loggedInUser ? (
        <div className={classNames("nav__login", loginOrder)}>
          <AccountCircleIcon
            className={classes.icon}
            style={{ cursor: "pointer" }}
            fontSize="large"
            color="inherit"
            onClick={() => setIsVisible(!isVisible)}
          />

          <div className={isVisible ? classes.appear : classes.disappear}>
            {loggedInUser.info.fullName}
            <span style={{ fontSize: "12px", marginBottom: "3px" }}>
              {loggedInUser.email}
            </span>
            <Link to="/profile" className={classes.profile}>
              <div>
                <span style={{ fontSize: "12px" }}>Profile</span>
              </div>
            </Link>
            <hr
              style={{
                border: "1px solid gray",
                opacity: "0.5",
                margin: 0,
                marginTop: "15px",
                width: "20vh",
                margin: "auto",
                marginBottom: "3px",
              }}
            />
            <div>
              <ExitToAppIcon fontSize="small" />
              <span
                style={{
                  cursor: "pointer",
                  marginLeft: "3px",
                  fontSize: "13px",
                }}
                onClick={() => {
                  auth.signOut();
                  setIsVisible(false);
                }}
              >
                Sign out
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/signin" className={classNames("nav__login", loginOrder)}>
          Sign In
        </Link>
      )}

      <a
        href="#"
        className={classNames("nav__hamburger-menu", hamburgerFlexOrder)}
        onClick={(event) => {
          setDisplayFlex(
            displayFlex === "custom-d-flex" ? "" : "custom-d-flex"
          );
          setHamburgerFlexOrder(
            hamburgerFlexOrder === "hamburger-flex-order"
              ? ""
              : "hamburger-flex-order"
          );
          setBrandFlexOrder(
            brandFlexOrder === "brand-flex-order" ? "" : "brand-flex-order"
          );
          setLoginOrder(
            loginOrder === "login-flex-order" ? "" : "login-flex-order"
          );
          setFlexDirection(
            flexDirection === "flex-direction" ? "" : "flex-direction"
          );
          setNavAnimation(
            navAnimation === "nav-animation" ? "" : "nav-animation"
          );
          setPaddingX(paddingX === "padding-x" ? "" : "padding-x");
          isNavOpen
            ? setNavSwitcher("closed-nav")
            : setNavSwitcher("opened-nav");

          setMarginBottom(
            marginBottom === "margin-bottom" ? "" : "margin-bottom"
          );

          setIsNavOpen(!isNavOpen);
        }}
      >
        <HamburgerIcon />
      </a>
    </nav>
  );
}

export default Nav;
