import React from "react";
import Aboutus from "./about/aboutus.jpg";
import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from './about/footer';
import Meronq from './about/meronq.jpg';

const inlineStyle = {
  right: '43.5%',
  top: '10%',
  position: 'absolute',
  color: 'white',
  padding: '20px', 
}

const ButtonStyle1 = {
  right: '8%',
  top: '32%',
  position: 'absolute',
  color: 'white',
  padding: '20px', 
}
const ButtonStyle2 = {
  right: '4%',
  top: '32%',
  position: 'absolute',
  color: 'white',
  padding: '20px', 
}
const ButtonStyle3 = {
  right: '0%',
  top: '32%',
  position: 'absolute',
  color: 'white',
  padding: '20px', 
}


const styles= {
  color: 'blue',
};



function About() {
  return <div>
      
      <div className="about">
      <Card>
        <div>
      <Button href="#" style={ButtonStyle1}><img src="https://img.icons8.com/ios-filled/50/000000/facebook-circled--v1.png"/></Button> 
     <Button href="#" style={ButtonStyle2}><img src="https://img.icons8.com/ios-filled/50/000000/apple-mail.png"/></Button> 
      <Button href="#" style={ButtonStyle3}><img src="https://img.icons8.com/material/50/000000/twitter--v1.png"/></Button>
      </div>
      <img src={Aboutus} width="1519" height="200" alt="aboutus" />
    <Card.Body>
      <Card.Text>
     
      <div  style={inlineStyle}><h1>ABOUT US</h1></div>
      </Card.Text>
    </Card.Body>
  </Card>
            <div style={{height: 500}}>
         <Figure>
           <center>
         <h1>History</h1>  
         <p><strong style={styles}>Smile Dental Clinic</strong> is an innovative medicine center, founded in 2015.</p>
         <h3>Main goals:</h3>
         <li>develop modern technologies and approaches field  dentistry and aesthetic medicine in Armenia</li>
         <li>combine the a and medicine into philosophy to  meet the aesthetic requirements of our century</li>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new  </p>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new  </p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers in</p>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new o</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers in</p>
         <img src={Meronq} width="730" height="450" alt="meronq" />
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new on</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers ind</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers in,</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers ind</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers ind</p>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new op</p>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new op</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers in,</p>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new op</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers ind</p>
         <p>we pay great attention to cooperation with foreign specialists. This type of cooperation opens up new op</p>
         <p>for over a century and providing multi-dentistry with the latest generation equipment. clinic offers in.</p>
         </center>
         </Figure>
         <Footer />
         </div>
         </div>
         
  </div>;
}

export default About;
