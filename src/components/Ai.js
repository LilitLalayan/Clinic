// react imports 
import {useState,useEffect} from "react"
import { useSpeechSynthesis } from 'react-speech-kit';
// AI
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MicrophoneIcon from '@material-ui/icons/MicNone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {BrowserRouter, Route, Link, Redirect, Switch} from "react-router-dom"
import About from "./About"
import Home from "./Home"
import { positions } from '@material-ui/system';



function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function Ai({handleOpenAi, handleCloseAi, openAi}) {

    
  const classes = useStyles();
  const { speak, speaking, cancel } = useSpeechSynthesis();

  
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [commandFieldValue, setCommandFieldValue] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const commands = [ {

    
    command: ["open *", "please open the *", "go to *"],
    callback: (redirectPage) => {
      console.log(redirectPage,"rrrrrrrrrrrrr")
      
      setRedirectUrl(redirectPage)
    } 
  }  
  ]
  const { transcript, resetTranscript } = useSpeechRecognition({commands})
  useEffect(() => {
    if(!speaking) {
      cancel()
    }
    
  }, [speak])
   const onEnd = () => {
     // You could do something here after speaking has finished
   };
  let redirect = "";
  console.log(transcript,"kkkkkkkkk")
  const pages = ["home", "about", "services", "doctors", "contacts", "store"];
  const urls = {
    home: "/",
    about: "/about",
    services: "/services",
    doctors:  "/doctors",
    contacts:  "/contacts",
    store: "/store"

  }  

  console.log(redirectUrl,"hhhhhhhhhhhh")
const f = async () => {
  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      await speak(`ok sir. opening ${redirectUrl}`)
      redirect = <Redirect to={urls[redirectUrl]} exact/>
    } else {

    }
  }
}
  

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }

    
    const handleOnChange = (e) => {
      if (transcript) {
        setCommandFieldValue(transcript);
      } else {
        setCommandFieldValue(e.target.value)
      }
    } 

    const handleMicrophoneSpeech = async (e) => {
      await SpeechRecognition.startListening()
      console.log(transcript)
    }
    console.log(openAi,"lllllllllllll")
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleOpenAi}>
          Open form dialog
        </Button>
        <Dialog position="absolute" right={0} bottom="5%"  BackdropProps={{ style: { backgroundColor: "transparent" } }} open={openAi} onClose={handleCloseAi} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Smart AI bot</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* {speak({text: "Hi my name is Valeri im smart chat BOT you can use below commands to navigate to our site"})} */}
              Hi my name is Susan im smart chat BOT you can use below commands to navigate to our site
            </DialogContentText>
            <div className={classes.demo}>
            <List >
              
                <ListItem>
                  <ListItemText
                    primary="show doctors"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="show services"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="book now"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="contact us"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="open store"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Kill our webSite"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
            </List>
            
            
          </div>

             <MicrophoneIcon onClick={handleMicrophoneSpeech} className={classes.microphoneIcon}/>
            <TextField
              autoFocus
              margin="dense"
              id="command"
              label="Command"
              type="text"
              fullWidth
              hint={commandFieldValue + " kjjjjjj"}
            />
            <p>{transcript}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAi} color="primary">
              Cancel
            </Button>
            
          </DialogActions>
        </Dialog>
        
          
          
            {redirect}
          
        

        
        
      </div>
      
    );
  }