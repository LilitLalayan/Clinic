import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/service/Services";
import Doctors from "./components/Doctors";
import Contacts from "./components/contacts/Contacts";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import Shop from "./components/shop/ShoppingItem"
// import Ai from "./components/Ai"

//import StomCard from "./components/shop/StomCard";
import Profile from "./components/Profile";
import AIIcon from '@material-ui/icons/RecordVoiceOver';
import { makeStyles } from "@material-ui/core/styles";
import useSpeechSynthesis from 'react-speech-kit/dist/useSpeechSynthesis';

// import Implants from "./components/shop/Implants"
// import Prostheses from "./components/shop/Prostheses"
// import Inhalers from "./components/shop/Inhalers"
// import Brushes from "./components/shop/Brushes"
// import Braces from "./components/shop/Braces"
// import ToothPaste from "./components/shop/ToothPaste"

import ShopHome from "./components/shop/ShopHome";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LinearProgress, Snackbar } from "@material-ui/core";
import { auth, db } from ".";
import { SET_LOGGEDIN_USER } from "./actions/actions";
import { connect, useSelector } from "react-redux";
import {
  selectIsAuthenticating,
  selectLoggedinUser,
} from "./reducers/selectors";
import Booking from "./components/Booking";
import Basket from "./components/shop/Basket";
import Payment from "./components/shop/Payment";

// const useStyles = makeStyles({
//   root: {
//     boxShadow: "2px 2px 20px	paleturquoise	",
//   },

//   textWhite: {
//     color: "#fff",
//   },

//   textSecondary: {
//     color: "deepskyblue",
//   },

//   grid: {
//     display: "flex",
//     justifyContent: "center",
//   },

//   center: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     alignItems: "center",
//   },

//   Paper: {
//     padding: "40px 10px",
//     marginTop: "80px",
//   },
//   typography: {
//     marginBottom: "40px",
//   },
//   trustIcon: {
//     color: "$60BFE6 !important",
//     fontSize: "80px",
//     display: "block",
//     marginBottom: "10px",
//   },

//   advantages: {
//     marginTop: "100px",
//     color: "#fff",
//     backgroundColor: "#60BFE6",
//     color: "#fff",
//     display: "block",
//     padding: "40px",
//   },

//   advantagesIcon: {
//     color: "#fff",
//     fontSize: "60px",
//     display: "block",
//     marginBottom: "10px",
//   },

//   title: {
//     marginBottom: "40px",
//     color: "white",
//   },

//   dentalInnerGrid: {
//     height: "auto",
//   },

//   card: {
//     height: "100%",
//     boxShadow:
//       "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
//   },

//   reviewSlideAvatar: {
//     marginBottom: "40px",
//     height: "200px",
//   },

//   reviewsSlideRate: {
//     marginBottom: "40px",
//   },
//   reviewsSlideName: {
//     marginBottom: "40px",
//   },

//   reviewsSlideText: {},

//   starIcon: {
//     color: "#00239c",
//   },

//   aiIcon: {
//     color: "red",
//     fontSize: "50px",
//     cursor: "pointer",
//     position: "fixed",
//     bottom: "5%",
//     right: "3%"
//   },
// });


function App({ dispatch }) {
  // const classes = useStyles();
  // const { speak } = useSpeechSynthesis();

  const loggedInUser = useSelector(selectLoggedinUser);
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const onAuthStateChanged = async (user) => {
    const userData = user ? { email: user.email, uid: user.uid } : user;
    if (userData) {
      const docRef = db.collection("users").doc(userData.uid);
      const doc = await docRef.get();
      userData.info = doc.data();
    }
    dispatch({
      type: SET_LOGGEDIN_USER,
      user: userData,
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged(onAuthStateChanged);
  }, []);

  // const [openAi, setOpenAi] = React.useState(false);
  
    // const handleOpenAi = () => {
    //   // speak({text: "Hi i am Susan, smartest chat bot ever"})
    //   setOpenAi(true);
    // };
  
    // const handleCloseAi = () => {
    //   // speak({text: "i hope i could help you sir"})
    //   setOpenAi(false);
      
    // };

  return (
    <Router>
      <div className="App">
        <Nav />

        {/* <Snackbar
         open={RedaxStore.snackbar.message}
         style={edaxStore.snackbar.severety} 
         onClose={dispatch(resetSnackbarMessage)}
         message="RedaxStore.snackbar.message"/> */}

        {loggedInUser ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/doctors" component={Doctors} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/shop" component={Shop} />
            <Route path="/booking" component={Booking} />
            <Route path="/basket" component={Basket} />
            <Route path="/payment" component={Payment} />
            <Route path="/shophome" component={ShopHome}></Route>
            <Route path="/profile" component={Profile} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Home" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/doctors" component={Doctors} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/basket" component={Basket} />
            <Route path="/payment" component={Payment} />

            {/* <Route path="/implants" component={Implants}></Route>
            <Route path="/toothbrushes" exact component={Brushes}></Route>
            <Route path="/toothpaste" exact component={ToothPaste}></Route>
            <Route path="/prostheses" component={Prostheses}></Route>
            <Route path="/braces" component={Braces}></Route>

            <Route path="/inhalers" component={Inhalers}></Route>
            <Route path="/shophome" component={ShopHome}></Route> */}

            <Redirect to="/" />
          </Switch>
        )}
      </div>
      {/* <AIIcon className={classes.aiIcon} onClick={handleOpenAi}/>
      <Ai className={classes.AI} handleOpenAi={handleOpenAi} handleCloseAi={handleCloseAi} openAi={openAi}/> */}
    </Router>
  );
}

export default connect()(App);
