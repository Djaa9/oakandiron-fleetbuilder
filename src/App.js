import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Button } from '@material-ui/core';
import SquadronBuilderView from './Components/SquadronBuilderView.js';
import LandingPage from './Components/LandingPage.js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import ListIcon from '@material-ui/icons/List';
import { useAuth0 } from "@auth0/auth0-react";
import UserLandingPage from './Components/UserLandingPage.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  appView: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { logout } = useAuth0();

  return (
    <>
      <div className={classes.drawer}>
        <Drawer
          open
          variant="permanent"
          classes={{ paper: classes.drawer }}>
          <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon><ListIcon /></ListItemIcon>
                <ListItemText primary="My Squadrons" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Squadron builder" />
              </ListItem>
            </List>
          </div>
          <Divider />
          <div>
          <Button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </Button>
          </div>
        </Drawer>
      </div>
      <div className={classes.appView}>
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/squadron">
              <SquadronBuilderView />
            </Route>
            <Route exact path="/squadron/:squadronId">
              <SquadronBuilderView />
            </Route>
            <Route exact path="/callback">
              <UserLandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}
export default App; 