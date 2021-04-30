import React from "react";
import "./Nav.css";
import Navbar from "./Navbar";
import LoginIcon from "@material-ui/icons/ExitToApp";
import Container from "@material-ui/core/Container";
import classNames from "classnames";
import HamburgerIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StarTwoTone } from "@material-ui/icons";

// paleturquoise

function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navSwitcher, setNavSwitcher] = useState("closed-nav");
  const [displayFlex, setDisplayFlex] = useState("");
  const [brandFlexOrder, setBrandFlexOrder] = useState("");
  const [hamburgerFlexOrder, setHamburgerFlexOrder] = useState("");
  const [loginOrder, setLoginOrder] = useState("");
  const [navAnimation, setNavAnimation] = useState("");
  const [flexDirection, setFlexDirection] = useState("");
  const [paddingX, setPaddingX] = useState("");
  return (
    <nav
      className={classNames(
        "nav",
        "custom-box-shadow-thin",
        paddingX,
        navAnimation,
        navSwitcher,
        flexDirection
      )}
    >
      <Link to="/home" className={classNames("nav__brand", brandFlexOrder)}>
        Smile Clinics
      </Link>

      <Navbar displayFlex={displayFlex} />

      <Link to="/signin" className={classNames("nav__login", loginOrder)}>
        Sign In
      </Link>

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
          setIsNavOpen(!isNavOpen);
        }}
      >
        <HamburgerIcon />
      </a>
    </nav>
  );
}

export default Nav;
