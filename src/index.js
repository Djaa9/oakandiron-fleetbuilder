import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { grey } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./muiTheme";
import Auth0ProviderWithHistory from "./Components/auth/auth-provider-with-history";
import { BrowserRouter as Router } from "react-router-dom";

document.body.style.backgroundColor = grey[200];

ReactDOM.render(
  <React.StrictMode>
    <meta name="viewport" content="width=device-width" />
    <Router>
    <Auth0ProviderWithHistory>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
