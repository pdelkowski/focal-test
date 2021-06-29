import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { theme } from "config";
import GlobalStyle from "./GlobalStyle";
import App from "./App";
import "./index.css";
import { AuthProvider } from "contexts/Auth";
import { UsersProvider } from "./contexts/Users";
import { ActivitiesProvider } from "./contexts/Activities";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ActivitiesProvider>
          <UsersProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UsersProvider>
        </ActivitiesProvider>
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
