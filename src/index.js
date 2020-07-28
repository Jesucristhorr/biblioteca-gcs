import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./components/Router";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7a7cff",
      main: "#304ffe",
      dark: "#0026ca",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffa270",
      main: "#ff7043",
      dark: "#c63f17",
      contrastText: "#000000",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("react")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
