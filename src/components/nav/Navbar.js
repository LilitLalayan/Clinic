import React from 'react'
import {Link} from 'react-router-dom'
import classNames from "classnames"
function Navbar({displayFlex}) {
    return (
        <ul className={classNames("custom-navbar", displayFlex)}>
            <li className="nav__item">
                <Link to="/about" className="nav__link">
                    About
                </Link>    
            </li>
            
            <li className="nav__item">
                <Link to="/services" className="nav__link">
                    Services
                </Link>  
            </li>
            
            <li className="nav__item">
                 <Link to="/doctors" className="nav__link">
                    Doctors
                </Link>  
            </li>
            
            <li className="nav__item">
                 <Link to="/contacts" className="nav__link">
                    Contacts
                </Link>  
            </li>
            
        </ul>
    )
}

export default Navbar
