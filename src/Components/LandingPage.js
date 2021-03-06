import React from "react";
import { Typography, AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SignupButton from "./auth/SignupButton";
import LoginLogOutButton from "./auth/LoginLogOutButton";
import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {

  const useStyles = makeStyles((theme) => ({
    LandingPageMainContainter: {
      padding: theme.spacing(2),
    },
    WelcomeMessage: {
      maxWidth: 500,
      padding: theme.spacing(3),
    },
  }));  

  const classes = useStyles();
  const { isAutheticated } = useAuth0();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="subtitle1">Oak &#38; Iron Toolkit</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.LandingPageMainContainter}
      >
        <Typography variant="h5">Welcome &#33;</Typography>
        <div className={classes.WelcomeMessage}>
          <Typography variant="body1" align="center">
            To this unofficial fan made toolkit app for the game Oak &#38; Iron
            by <a href="https://www.firelockgames.com/oak-iron/"> Firelock games </a>
            . The app offers a Squadron Builder which will help you build a
            legal fleet of ships and hand of initiative cards.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.WelcomeMessage}>
            You can download and use this toolkit as an App on your iOS or
            Android device by adding it to your home screen from Safari or
            Chrome.
          </Typography>
          </div>
          { isAutheticated &&
          <>
          <Typography
            variant="body1"
            align="center">
            Soon you will be able to save your squadrons to your profile. You can sign up now and be ready for when the feature launches.
          </Typography>
        
          <div>
            <SignupButton />
            <Button to="/squadron" component={Link}>
              Skip
            </Button>
            <LoginLogOutButton />
          </div>
          </>        
            }
            { !isAutheticated &&
            <Button 
              variant="contained" 
              color="primary" 
              to="/squadron" 
              component={Link}>
              Continue
            </Button>     
            }

      </Grid>
    </div>
  );
}

export default LandingPage;
