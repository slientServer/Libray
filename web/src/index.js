import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router';
import App from './App';
import rootReducer from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//redux inject
const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history)
    ),
  ),
)

ReactDOM.render(
  <Provider store = {store}>
    <ConnectedRouter history = {history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
