import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Register } from './containers/Auth';
import Admin from './containers/Admin';
import { hot } from 'react-hot-loader';

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/admin" component={ Admin } />
    </Switch>
  </div>
);

export default hot(module)(App);
