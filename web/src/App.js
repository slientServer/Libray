import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router';
import Index from './containers/Index';
import { Login, Register } from './containers/Auth';
import { hot } from 'react-hot-loader';

const App = () => (
  <div>
    <Switch>
      <Route path="/login" component={ Login } />
    </Switch>
  </div>
);

export default hot(module)(App);
