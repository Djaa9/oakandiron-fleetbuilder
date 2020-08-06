import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import FleetBuilderView from './Components/FleetBuilderView.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/fleetbuilder/:fleet" render={(props) => <FleetBuilderView urlParams={props} /> }>
        </Route>
        <Route exact path="/">
          <FleetBuilderView />
        </Route>
        <Route exact path="/fleetBuilder">
          <FleetBuilderView />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;