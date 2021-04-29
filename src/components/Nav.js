import { auth } from "..";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React from "react";
import "./Nav.css";
import Navbar from "./Navbar";
import classNames from "classnames";
import HamburgerIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

const signOut = () => {
  auth.signOut();
  console.log("out");
  const signout = document.querySelector(".signout");
  const icon = document.querySelector(".icon");
  icon.style.display = "none";
  signout.style.display = "none";
};

function visible() {
  const signout = document.querySelector(".signout");
  if (signout.style.display === "none") {
    signout.style.display = "block";
  } else {
    signout.style.display = "none";
  }
}

function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navSwitcher, setNavSwitcher] = useState("closed-nav");

  return (
    <nav className={classNames("nav", "custom-box-shadow-thin", navSwitcher)}>
      <Link to="/home" className="nav__brand">
        Smile Clinics
      </Link>

      <Navbar />

      <Link to="/signin" className="nav__login">
        Sign In
      </Link>
      <div>
        <AccountCircleIcon
          className="icon"
          style={{ cursor: "pointer" }}
          fontSize="large"
          color="inherit"
          onClick={visible}
        />

        <div className="signout" onClick={signOut}>
          Log out
        </div>
      </div>

      <a
        href="#"
        className={classNames("nav__hamburger-menu")}
        onClick={(event) => {
          isNavOpen
            ? setNavSwitcher("closed-nav")
            : setNavSwitcher("opened-nav");
          setIsNavOpen(!isNavOpen);
        }}
      >
        <HamburgerIcon />
      </a>
    </nav>
  );
}

export default Nav;
