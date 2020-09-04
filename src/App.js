import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Link
} from "@material-ui/core";
import SquadronBuilderView from "./Components/SquadronBuilderView.js";
import LandingPage from "./Components/LandingPage.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BuildIcon from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";
import { useAuth0 } from "@auth0/auth0-react";
import UserLandingPage from "./Components/UserLandingPage.js";

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
  const theme = useTheme();
  const { logout } = useAuth0();

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
            <Button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
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
              <Redirect to="/user" />
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
