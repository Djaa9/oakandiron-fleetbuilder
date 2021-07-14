import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Link
} from "@material-ui/core";
import SquadronBuilderView from "./Components/SquadronBuilderView.js";
import LandingPage from "./Components/LandingPage.js";
import { makeStyles } from "@material-ui/core/styles";
import BuildIcon from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";
import UserLandingPage from "./Components/UserLandingPage.js";
import LoginLogOutButton from "./Components/auth/LoginLogOutButton.js";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appView: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.drawer}>
        <Drawer open variant="permanent" classes={{ paper: classes.drawer }}>
          <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <Link href="/user">
                  <ListItemText primary="My Squadrons"/>
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <Link href="/squadron">
                <ListItemText primary="Squadron builder" />
                </Link>
              </ListItem>
            </List>
          </div>
          <Divider />
          <div>
            <LoginLogOutButton/>
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
            <Route exact path="/user">
              <UserLandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};
export default App;
