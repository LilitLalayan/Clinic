import React from 'react'
import './Nav.css'
import Navbar from './Navbar'
import LoginIcon from '@material-ui/icons/ExitToApp';
import Container from '@material-ui/core/Container';
import classNames from 'classnames';
import HamburgerIcon from '@material-ui/icons/Menu';
import {useState} from 'react';
import {Link} from "react-router-dom"
// paleturquoise

function Nav() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [navSwitcher, setNavSwitcher] = useState("closed-nav");
    const [left, setLeft] = useState("");


    return (
        
            <nav  className={classNames("nav", "custom-box-shadow-thin", navSwitcher)}>
                <Link to="/home" className="nav__brand">
                    Smile Clinics
                </Link>
                
                <Navbar />

                <Link to="/signin" className="nav__login">
                    Sign In
                </Link>
                
                
                <a href="#"
                   className={classNames("nav__hamburger-menu", )} 
                   onClick={(event) => {
                    // setDisplayNone("custom-display-none");
                    isNavOpen ? setNavSwitcher("closed-nav") : setNavSwitcher("opened-nav");
                    setIsNavOpen(!isNavOpen);
                }}>
                    <HamburgerIcon />
                </a>
            </nav>
                
    )
}

export default Nav
