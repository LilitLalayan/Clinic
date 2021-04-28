import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <ul className="navbar">
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
