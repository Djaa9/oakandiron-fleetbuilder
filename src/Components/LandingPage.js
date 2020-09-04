import React, { useEffect } from "react";
import { Typography, AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LoginButton from "./LoginButton";
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

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const classes = useStyles();

  useEffect(() => {

  },[]);

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
        justify="flex-start"
        alignItems="center"
        className={classes.LandingPageMainContainter}
      >
        <Typography variant="h5">Welcome &#33;</Typography>
        <div className={classes.WelcomeMessage}>
          <Typography variant="body1" align="center">
            To this unofficial fan made toolkit app for the game Oak &#38; Iron
            by{" "}
            <a href="https://www.firelockgames.com/oak-iron/">
              {" "}
              Firelock games{" "}
            </a>
            . The app offers a Squadron Builder which will help you build a
            legal fleet of ships and hand of initiative cards.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.WelcomeMessage}
          >
            You can download and use this toolkit as an App on your iOS or
            Android device by adding it to your home screen from Safari or
            Chrome.
          </Typography>
        </div>
        {!isAuthenticated && (
          <div>
            <LoginButton />
            <Button to="/squadron" component={Link}>
              Skip
            </Button>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default LandingPage;
