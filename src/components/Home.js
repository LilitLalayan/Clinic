import React from "react";
import "./Home.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "@fontsource/roboto";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import ImageSlider from "./ImageSlider";
import { waitForElementToBeRemoved } from "@testing-library/dom";

function Home() {
  return (
    <div className="home" style={{ marginTop: 5 }}>
      <div className="hero">
        <Container fixed>
          <img
            className="hero__logo"
            src="http://localhost:3000/images/smile.jpg"
            alt="smile"
            width="150"
          />

          <h2 className="hero__subtitle">We care about our patients</h2>
          <img
            src="http://localhost:3000/images/office-4.jpg"
            alt="Smile Clinics"
            className="hero__img"
          />
        </Container>
      </div>

      <div className="advantages">
        <h2 className="advantages__title">Our Advantages</h2>
        <Grid container>
          <Grid item lg sm={6} xs={12}>
            <div className="advantages__item">
              <LocalMallIcon />
              <p className="advantages__text">
                Working with insurance packages
              </p>
            </div>
          </Grid>

          <Grid item lg sm={6} xs={12}>
            <div className="advantages__item">
              <ImportantDevicesIcon />
              <p className="advantages__text">Innovative technologies</p>
            </div>
          </Grid>

          <Grid item lg sm={6} xs={12}>
            <div className="advantages__item">
              <VerifiedUserIcon />
              <p className="advantages__text">
                Guaranteed successful treatment
              </p>
            </div>
          </Grid>

          <Grid item lg sm={6} xs={12}>
            <div className="advantages__item">
              <LocalHospitalIcon />
              <p className="advantages__text">Certified doctors</p>
            </div>
          </Grid>
        </Grid>
      </div>

      <Container fixed>
        <h2 className="image-slider__title">Patients reviews</h2>
        <ImageSlider />
      </Container>

      <div className="embed">
        <embed
          width="60%"
          height="100%"
          src="https://www.youtube.com/embed/pKF_doN3Tz8"
        ></embed>
      </div>
      <div className="embed"></div>
    </div>
  );
}

export default Home;
