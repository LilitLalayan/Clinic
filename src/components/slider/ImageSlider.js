import React from 'react'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useState} from "react"
import "./Slider.css"
import { makeStyles } from "@material-ui/core/styles";
import {MainSliderImages} from "./MainSliderImages"
import MainSlide from "./MainSlide"

const useStyles = makeStyles({
  root: {
    boxShadow: "2px 2px 20px	paleturquoise	",
  },

  ImageSlider: {
    width: "100vw",
    height: "400px"
  },
  slider__image: {
    width: "100vw",
    height: "100%px"
  }
})


function iconStyles() {
    return {
      arrow: {
        width: "40px",
        height: "40px",
        color: '#fff'
      }
    }
  }


function ImageSlider() {
    const [index, setIndex] = useState(0);
    const classes = useStyles();

    return (
        <div className="image-slider">
            <a href="#" className="image-slider__arrow-left" onClick={(event) => {
                event.preventDefault();
                index === 0 ? setIndex(MainSliderImages.length - 1) : setIndex(index - 1);
            }}><ArrowLeftIcon className={classes.arrow} fontSize="large" color="action" style={{fontSize: 70}}/></a>
            <MainSlide index={index}/>
            
                
            
            <a href="#" className="image-slider__arrow-right" onClick={(event) => {
                event.preventDefault();
                index === MainSliderImages.length - 1 ? setIndex(0) : setIndex(index + 1);
            }}><ArrowRightIcon fontSize="large" color="action" style={{fontSize: 70}}/></a>
        </div>
    )
}

export default ImageSlider
