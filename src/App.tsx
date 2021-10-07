import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from './pages/Registration';
import Library from './pages/Library';
import Login from './pages/Login';
import { css } from '@linaria/core';
import AuthProvider from './contexts/AuthProvider';
import { CookiesProvider } from 'react-cookie';
import PrivateRoute from './components/PrivateRoute';

export const globals = css`
  :global() {
    body {
      margin: 0;
      font-family: 'Shippori Mincho', serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;

function App() {
  return (
    <Router>
      <Switch>
        <CookiesProvider>
          <AuthProvider>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Library />
            </PrivateRoute>
          </AuthProvider>
        </CookiesProvider>
      </Switch>
    </Router>
  );
}

export default App;
