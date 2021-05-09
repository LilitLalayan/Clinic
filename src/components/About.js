import React from "react";
import Aboutus from "./about/aboutus.jpg";
import Figure from 'react-bootstrap/Figure';
import Footer from './about/footer';
import Card from './about/card';
import Slider from './about/slider';



const inlineStyle = {
  right: '42%',
  top: '18%',
  position: 'absolute',
  color: 'white',
  padding: '20px', 
}

const textStyle = {
  right: '28%',
  top: '40%',
  position: 'absolute',
  padding: '50px', 
}

const styles= {
  color: 'blue',
};


function About() {
  return <div>
      <div className="about">
      <img src={Aboutus} width="1519" height="200" alt="aboutus" />
      <div  style={inlineStyle}><h1><strong>ABOUT US</strong></h1></div>
      <Card />
            <div style={{height: 1100}}>
        <Figure style={textStyle}>
         <h1><strong>History</strong></h1>  
         <h4><strong style={styles}>Smile Dental Clinic</strong> is an innovative medicine center, founded in 2015.</h4>
         <hr/>
         <h5><strong>Main goals:</strong></h5>
         <li>develop modern technologies and approaches field  dentistry and aesthetic medicine in Armenia,</li>
         <li>combine the a and medicine into philosophy to  meet the aesthetic requirements of our century</li>
         <p>During the years of experience in the Armenian market, Smile Dental Clinic has reached a level that can satisfy even the most demanding patients from many European countries. </p>
         <p>To date, we have had more than 15,000 patients from Armenia and around the world.</p>
         <p>The reference Smile Dental Clinic offers individual treatment methods for each patient, providing high-level treatment that is equal to American and European standards.</p>
         <p>In 2018, the range of services was enriched with jaw surgery. Despite the large list of plastic surgeries offered, which is constantly expanding according to the needs of our patients, we pay great attention to cooperation with foreign specialists. This type of cooperation opens new opportunities for the citizens and guests of our country.</p>
         <p>Being a customer-oriented company, it is very important for us to provide a safe environment for every client visiting our clinic, perfect insight into the culture of human interaction and fair treatment with the provision of technical and professional qualifications.</p>
        </Figure>
      </div>
    </div>
        <Slider />
        <Footer />
  <div> 
 </div> 
</div>;
}


export default About;
