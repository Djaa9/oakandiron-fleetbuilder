import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FleetBuilderView from './Components/FleetBuilderView.js';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './muiTheme'
import LandingPage from './Components/LandingPage.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/fleetBuilder">
          <FleetBuilderView />
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
  );
}
export default App;