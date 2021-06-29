import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { routes } from "config";
import { useAuth } from "contexts/Auth";
import { useActivitiesDispatch } from "contexts/Activities";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import authService, { LoginParams, LoginOPTParams,  LoginResponse } from "services/auth.service";

const alertStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  width: '300px',
  boxSizing: 'border-box'
}

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF'
}

// @ts-ignore
const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
      X
      </button>
    </div>
  )
}

const AppShell = styled.div`
  padding-bottom: 80px;
  font-family: "Stem", sans-serif;
`;

function App() {
  const auth = useAuth();
  const activitiesDispatch = useActivitiesDispatch();

  const APP_VERSION = process.env.REACT_APP_VERSION;

  const retrieveActivities = async () => {
    const response = await authService.retrieveActivities();

    activitiesDispatch({
      type: "FETCH_ACTIVITIES",
      payload: response.data
    });
  }

  React.useEffect(() => {
    if (auth?.user) {
      // dispatch user related API to get all required data when user logged in
      activitiesDispatch({ type: "RESET_ACTIVITES" });
      retrieveActivities()
    }
  }, [auth?.user]);

  const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

  const getPrivateRoute = (
    path: string,
    name: string,
    Component: any,
    key: number
  ) => {
    return (
      <Route
        exact
        path={path}
        key={key}
        render={(props) => {
          if (!auth?.user) {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
          return (
            <div>
              <Component />
            </div>
          );
        }}
      />
    );
  };

  const getPublicRoute = (
    path: string,
    name: string,
    Component: any,
    key: number
  ) => {
    return (
      <Route
        exact
        path={path}
        key={key}
        render={(props) => {
          return (
            <div>
              <Component />
            </div>
          );
        }}
      />
    );
  };

  return (
    <AppShell>
      <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
          {routes.map(({ path, name, Component, isPrivate }, key) =>
            isPrivate === false
              ? getPublicRoute(path, name, Component, key)
              : getPrivateRoute(path, name, Component, key)
          )}
        </Switch>
        <div style={{ display: "none" }} data-app-version={APP_VERSION}></div>
      </AlertProvider>
    </AppShell>
  );
}

export default App;
