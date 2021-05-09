import React from "react";
import {MainSliderImages} from "./MainSliderImages"

function MainSlide(props) {
  return (
    <div className="slide">
      <img
        src={MainSliderImages[props.index].photo}
        alt="dental"
        className="slide__dental-img"
      />
    </div>
  );
}

export default MainSlide;
