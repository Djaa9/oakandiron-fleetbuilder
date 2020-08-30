import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { grey } from "@material-ui/core/colors";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./muiTheme";

document.body.style.backgroundColor = grey[200];

ReactDOM.render(
  <React.StrictMode>
    <meta name="viewport" content="width=device-width" />
    <Auth0Provider
      domain="djaa9.eu.auth0.com"
      clientId="WPo4R6orM8zJfGoss7R71Q2yDcqWB590"
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
