import React from "react";
import {Carousel, CarouselItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nkar from '../about/nkar.jpg';
import Img2 from '../about/Image2.jpg';
import Img3 from '../about/Image3.jpg';
import Nkar4 from '../about/nkar4.jpg';
import Nkar5 from '../about/nkar5.jpg';
import './about.css';


const styles = {
    
     top: '100%',
     position: 'relative',
     padding: '20px', 
    
  }


  
function Aboutslider(){
    return(
       <>
            
            <Carousel className="carousel-iner" style={styles}>
            <Carousel.Item className="carousel-item">
                    <img className="carousel-img" src={Nkar}  alt="nkar"/>
                    <Carousel.Caption>
                     <h2>our specialists</h2>
                     <h4>Dr. Alen Markosyan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img className="carousel-img" src={Img2} alt="Img2"/>
                    <Carousel.Caption>
                     <h2>our specialists</h2>
                     <h4>Dr. Lilit Galstyan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img className="carousel-img" src={Img3}  alt="Img3"/>
                    <Carousel.Caption>
                      <h2>our specialists</h2>
                      <h4>Dr. Tatev Sahakyan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img className="carousel-img" src={Nkar4}  alt="nkar4"/>
                    <Carousel.Caption>
                      <h2>our specialists</h2>
                      <h4>Dr. Levon Asatryan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img  className="carousel-img" src={Nkar5} alt="kar5"/>
                    <Carousel.Caption>
                      <h2>our specialists</h2>
                      <h4>Dr. Ani Margaryan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>
            
        </>
    )
}
export default Aboutslider;