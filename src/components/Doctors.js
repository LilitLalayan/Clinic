import React from 'react'
import {Link} from "react-router-dom"


function Doctors() {
    return (
        <div>
            <Link to="/booking">
                <a href="#">book now</a>
            </Link>
        </div>
    )
}

export default Doctors
