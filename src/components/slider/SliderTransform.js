import React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import classNames from "classnames";
import { ArrowRight, ArrowLeft } from "@material-ui/icons";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {},

  container: {
    overflow: "hidden",
    position: "relative",
    marginTop: "100px",
  },

  sliderTransform: {
    width: "100%",
    // overflow: "hidden",
    display: "flex",
  },

  arrowLeft: {
    fontSize: "80px",
  },

  arrowRight: {
    fontSize: "80px",
  },

  prev: {
    position: "absolute",
    top: "50%",
    left: "5%",
  },

  next: {
    position: "absolute",
    top: "50%",
    right: "5%",
  },
});

function SliderTransform(props) {
  const [move, setMove] = useState({
    translate: 0,
    currentIndex: 0,
    transition: 1,
    sign: "",
  });
  const children = useRef([props.children, props.children]);

  const classes = useStyles();
  useEffect((delay) => {
    const id = setInterval(() => {
      moveSlide("next");
    }, 4000);

    return () => {
      clearInterval(id);
    };
  });

  const moveSlide = (sign) => {
    // console.log(move, "zzzzz");
    if (Math.abs(move.currentIndex) === 7) {
      setMove({
        translate: 0,
        currentIndex: 0,
        transition: 1,
      });
    } else if (move.currentIndex === 1) {
      setMove({
        translate: 0,
        currentIndex: 0,
        transition: 1,
      });
    } else {
      setMove({
        transition: 1,
        translate:
          sign === "next"
            ? (move.currentIndex + -1) * props.width
            : (move.currentIndex + 1) * props.width,
        currentIndex:
          sign === "next" ? move.currentIndex - 1 : move.currentIndex + 1,
      });
    }
  };
  const prevSlide = () => {
    moveSlide(move.sign);
  };

  const nextSlide = () => {
    moveSlide("next");
  };

  const handleClick = (e, name) => {
    console.log(name);
    if (name === "next") {
      moveSlide("next");
    } else if (name === "prev") {
      moveSlide("prev");
    }
  };
  // console.log(move.currentIndex,"gggggggggg")
  return (
    <Container fixed className={classes.container}>
      <div
        style={{
          transform: `translate(${move.translate}%)`,
          transition: `ease-in-out ${move.transition}s`,
        }}
        className={classNames(classes.sliderTransform, move.toString())}
      >
        {children.current.map((child) => {
          return child;
        })}
      </div>
      <Link className={classes.prev} onClick={(e) => handleClick(e, "prev")}>
        <ArrowLeft className={classes.arrowLeft} />
      </Link>

      <Link className={classes.next} onClick={(e) => handleClick(e, "next")}>
        <ArrowRight className={classes.arrowRight} />
      </Link>
    </Container>
  );
}

export default SliderTransform;
