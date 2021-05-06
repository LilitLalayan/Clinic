import React from "react";
import {Carousel, CarouselItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nkar from '../about/nkar.jpg';
import Img2 from '../about/Image2.jpg';
import Img3 from '../about/Image3.jpg';
import Nkar4 from '../about/nkar4.jpg';
import Nkar5 from '../about/nkar5.jpg';



const styles = {
    right: '15%',
    top: '120%',
    position: 'absolute',
    padding: '20px', 
    
  }


function Aboutslider(){
    return(
        <div >
            
            <Carousel style={styles}>
            <Carousel.Item>
                    <img src={Nkar} height="600px" width="1000px" alt="nkar"/>
                    <Carousel.Caption>
                     <h2>our specialists</h2>
                     <h4>Dr. Alen Markosyan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Img2} height="600px" width="1000px" alt="Img2"/>
                    <Carousel.Caption>
                     <h2>our specialists</h2>
                     <h4>Dr. Lilit Galstyan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Img3} height="600px" width="1000px" alt="Img3"/>
                    <Carousel.Caption>
                      <h2>our specialists</h2>
                      <h4>Dr. Tatev Sahakyan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Nkar4} height="600px" width="1000px" alt="nkar4"/>
                    <Carousel.Caption>
                      <h2>our specialists</h2>
                      <h4>Dr. Levon Asatryan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Nkar5} height="600px" width="1000px" alt="kar5"/>
                    <Carousel.Caption>
                      <h2>our specialists</h2>
                      <h4>Dr. Ani Margaryan</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>
            
        </div>
    )
}
export default Aboutslider;