import React from "react";
import "./Home.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "@fontsource/roboto";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import ImageSlider from "./slider/ImageSlider";
// import smileIcon from '@material-ui/icons/EmojiEmotionsSharp';
import { MainSliderImages } from "./slider/MainSliderImages";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Image from "@material-ui/core/";
import "./contacts/Contacts.css";
import ContactsSimpleMap from "./contacts/ContactsSimpleMap";

function Home() {
  console.log(MainSliderImages, "lll");
  return (
    <div className="home">
      <ImageSlider mainSliderData={MainSliderImages} />

      <Paper
        elevation={10}
        style={{
          width: "300px",
          padding: "80px",
          position: "relative",
          left: "60%",
          marginTop: "-140px",
          zIndex: "1",
        }}
      >
        <Typography variant="h3">Plan Your</Typography>

        <Typography variant="h3">Visit Now</Typography>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ background: "orange", marginTop: "40px" }}
        >
          Book Now
        </Button>
      </Paper>

      <Grid
        container
        style={{ marginTop: "200px", background: "#eee", padding: "80px 0" }}
      >
        <Grid
          item
          sm={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            style={{ textAlign: "center", fontWeight: "100" }}
          >
            Our Cases <br /> & <br /> Patient Stories
          </Typography>
        </Grid>

        <Grid item sm={6}>
          <Grid container alignItems="center">
            <Grid item sm={3} style={{ marginLeft: "30px" }}>
              <img
                style={{ marginTop: "-60px", marginLeft: "30px" }}
                className="home__clients-img"
                src="http://localhost:3000/images/patimages/img1.jpg"
              />
            </Grid>

            <Grid item sm={3} style={{ marginLeft: "30px" }}>
              <img
                style={{ matrginBottom: "-30px", marginLeft: "30px" }}
                className="home__clients-img"
                src="http://localhost:3000/images/patimages/img2.jpg"
              />
            </Grid>

            <Grid item sm={3} style={{ marginLeft: "30px" }}>
              <img
                style={{ marginTop: "-30px", marginLeft: "30px" }}
                className="home__clients-img"
                src="http://localhost:3000/images/patimages/img3.jpg"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Container fixed style={{ marginTop: "100px" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item md={6}>
            <img
              className="home__clinic-img"
              src="http://localhost:3000/images/clinic.jpg"
              width="50%"
            />
          </Grid>
          <Grid item md={6}>
            <Typography component="h2" variant="h4">
              A Warm Welcome and a Beautiful Smile
            </Typography>
            <br />
            <Typography
              component="h4"
              variant="h5"
              style={{ marginBottom: "40px" }}
            >
              Our clients are our priority, we offer quality dental services
              with a team of specialists. More details about our services below.
            </Typography>
            <br />
            <Typography
              component="h1"
              variant="h6"
              style={{ marginBottom: "40px" }}
            >
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings of the
              great
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              style={{ marginBottom: "40px" }}
            >
              explorer of the truth, the master-builder of human happiness. Nor
              again is there anyone who loves or pursues or desires to obtain
              pain of itself, because it is pain, but because occasionally
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              style={{ marginBottom: "40px" }}
            >
              circumstances occur in which toil and pain can procure him some
              great pleasure.
            </Typography>
          </Grid>
        </Grid>
      </Container>

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

      <Container fixed style={{ marginTop: "100px" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item md={6}>
            <img
              className="home__clinic-img"
              src="http://localhost:3000/images/studio.jpg"
              width="50%"
            />
          </Grid>
          <Grid item md={6}>
            <Typography component="h2" variant="h4">
              Dentist Clinic
            </Typography>
            <br />
            <Typography
              component="h4"
              variant="h5"
              style={{ marginBottom: "40px" }}
            >
              Our clients are our priority, we offer quality dental services
              with a team of specialists. More details about our services below.
            </Typography>
            <br />
            <Typography
              component="h1"
              variant="h6"
              style={{ marginBottom: "40px" }}
            >
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings of the
              great
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              style={{ marginBottom: "40px" }}
            >
              explorer of the truth, the master-builder of human happiness. Nor
              again is there anyone who loves or pursues or desires to obtain
              pain of itself, because it is pain, but because occasionally
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              style={{ marginBottom: "40px" }}
            >
              circumstances occur in which toil and pain can procure him some
              great pleasure.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container fixed>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Find Us
        </Typography>
        <Grid container>
          <Grid item lg={6} md={5} xs={12}></Grid>
        </Grid>
        <div className="contacts__map">
          <ContactsSimpleMap />
        </div>
      </Container>
    </div>
  );
}

// <div className="home" style={{ marginTop: 5 }}>

//   <div className="hero">
//     <Container fixed>
//       <img className="hero__logo"
//         src="http://localhost:3000/images/smile.jpg"
//         alt="smile"
//         width="150"
//       />
//       {/* <h1 className="hero__title">
//         <span className="hero__title--green">Smile </span>
//          Clinics
//       </h1> */}
//       <h2 className="hero__subtitle">We care about our patients</h2>
//       <img src="http://localhost:3000/images/clinics-inside.jpg" alt="Smile Clinics" className="hero__img"/>
//     </Container>
//   </div>

{
  /* 

      <Container fixed>
        <h2 className="image-slider__title">Patients Reviews</h2>
        <ImageSlider/ >
      </Container>
    </div> */
}
<Container></Container>;

export default Home;
