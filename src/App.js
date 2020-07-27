import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import FleetBuilder from './Components/FleetBuilder.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/fleetbuilder/:fleet" render={(props) => 
          <FleetBuilder fleetToImport={props} /> }>
        </Route>
        <Route path="/">
          <FleetBuilder />
        </Route>
      </Switch>
    </Router>

  );
}
export default App;