import React from "react";
import ContactsAddress from "../ContactsAddress";
import ContactsWorkingHours from "./ContactsWorkingHours";
import ContactsSimpleMap from "./ContactsSimpleMap";
import "@fontsource/roboto";
import "./Contacts.css";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import {useState} from "react";
import {db} from "../..";


const useStyles = makeStyles((theme) => ({

  
  gridContainer: {
    marginTop: "20px",
    height: "80vh"
  },
  
  gridItem: {
    color: "#fff",
    height: "100%",
    backgroundColor: "#fff",
    padding: "40px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    ['@media (min-width:960px)']: { // eslint-disable-line no-useless-computed-key
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    }
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },  
}));


function Contacts() {
  const classes = useStyles();

    
    const [contactUsData, setContactUsData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        additionalDetails: ""
    })

    const onBtnClick = async (event) => {
        event.preventDefault();
        try {
            const docRef = await db.collection("contact-us-data").doc("contact-us-data: "  + contactUsData.email).set(contactUsData);
            
            } catch (e) {
            console.error("Error adding document: ", e);
            }
    }

    const onChange = (event) => {
        let id = event.target.id;
        let value = event.target.value;

         


        setContactUsData(prevState => ({
          ...prevState,
          [id]: value
        }))  
    }  

    console.log(contactUsData)


  return (<div className="contacts">
    

    <Container fixed>
      <CssBaseline />
      <h2 className="contact-us__title" style={{fontSize: "30px",textAlign: "center"}}>Contact Us</h2>
      <div className={classes.paper}>
        {/* <Typography component="h1" variant="h5">
          Contact Us
        </Typography> */}
        <Paper elevation={10} style={{padding: "40px"}}>
          <Grid container justify="space-between">
            <Grid item sm={6}>
              <form className={classes.form} noValidate>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={onChange}
                      />
                    </Grid>
                   
                    <Grid item sx={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={onChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChange}
                      />
                    </Grid>
                  
                    <Grid item xs={12}>
                      <TextField
                        id="message"
                        label="Message *"
                        multiline
                        fullWidth
                        rows={2}
                        variant="outlined"
                        onChange={onChange}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        id="additionalDetails"
                        label="Additional Details"
                        multiline
                        fullWidth
                        rows={4}
                        variant="standard"
                        required
                        onChange={onChange}
                      />
                    </Grid>
                    
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{background: "#D09683"}}
                      className={classes.submit}
                      onClick={onBtnClick}
                    >
                      Send Message
                    </Button>
          </Grid>
            
        </form>
            </Grid>
        
            <Grid item sm={5}>
              <Grid container>
                <Grid item xs={12}>
                    <ContactsWorkingHours />
                </Grid>
                <Grid item  xs={12}>
                  <ContactsAddress />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justify="center">
            <Grid item xs={12}>
            <div className="contacts__map">
              <ContactsSimpleMap/>
            </div>
            </Grid>
            
          </Grid>
        </Paper>  
  </div>
  </Container>
  </div>)
}

export default Contacts;

{/* <Container fixed >
      
    </Container> */}