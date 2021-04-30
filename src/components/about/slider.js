import React from "react";
import {Carousel, CarouselItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img0 from '../about/Image0.jpg';
import Img1 from '../about/Image1.jpg';
import Img2 from '../about/Image2.jpg';
import Img3 from '../about/Image3.jpg';
import Img4 from '../about/Image4.jpg';



const styles = {
    right: '0%',
    top: '117%',
    position: 'absolute',
    padding: '20px', 
  }



function Aboutslider(){
    return(
        <div>
            
            <Carousel  style={styles}>
                <Carousel.Item>
                    <img src={Img0} height="450px" width="650px" alt="Img0"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Img1} height="450px" width="650px" alt="Img1"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Img2} height="450px" width="650px" alt="Img2"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Img3} height="450px" width="650px" alt="Img3"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={Img4} height="450px" width="650px" alt="Img4"/>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
export default Aboutslider;