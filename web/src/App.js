import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Register } from './containers/Auth';
import { hot } from 'react-hot-loader';

const App = () => (
  <div>
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
    </Switch>
  </div>
);

export default hot(module)(App);
