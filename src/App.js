import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Drawer, List, ListItem, makeStyles } from '@material-ui/core';
import SquadronBuilderView from './Components/SquadronBuilderView.js';
import LandingPage from './Components/LandingPage.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  appView: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
}));

const App = () => {

  const classes = useStyles();

  return (
    <>
    <div className={classes.drawer}>
      <Drawer
        open
        variant="permanent"
        classes={{paper: classes.drawer}}>
        <div>
          <List>
            <ListItem>
              test
            </ListItem>
          </List>
        </div>
      </Drawer>
      </div>
      <div className={classes.appView}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/squadron">
            <SquadronBuilderView />
          </Route>
          <Route exact path="/squadron/:squadronId">
            <SquadronBuilderView />
          </Route>
        </Switch>
      </Router>
      </div>
    </>
  );
}
export default App; 