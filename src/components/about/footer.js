import React from "react";

const footer = () => {
    return(
        <div class site-footer>
        <div >
        <div className="main-footer" >
           <div className="container">
               <div className="row">
                   {/* Column1 */}
                   <div className="col">
                       <h3>Basic services</h3>
                       <hr/>
                       <ul className="list-unstyled">
                           <li>Dentistry</li>
                           <li>Jaw surgery</li>
                       </ul>
                   </div>
                   {/* Column2 */}
                   <div className="col">
                       <h3>Call Us</h3>
                       <hr/>
                       <ul className="list-unstyled">
                           <li>Reception +374-10-88-00-88</li>
                           <li>Dr Asatryan +374-91-22-22-22</li>
                           <li>Dr Sahakyan +374-91-33-33-33</li>
                           <li>Dr Petrosyan +374-91-77-77-77</li>
                       </ul>
                   </div>
                   {/* Column3 */}
                   <div className="col">
                       <h3>Address</h3>
                       <hr/>
                       <ul className="list-unstyled">
                       <li> Yerevan Armenia</li>
                       <li>33 Sayat-Nova Ave</li>
                       </ul>
                   </div>
               </div>
               <hr/>
               <div className="row">
                   <p className="col-sm">
                       &copy;{new Date().getFullYear()} Smile Dental Clinic. innovative medicine center
                   </p>
               </div>
           </div>
        </div>
        </div>
        </div>
    )
} 

export default footer;