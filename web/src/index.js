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
import ReduxThunk from 'redux-thunk';

import { addLocaleData, IntlProvider } from 'react-intl';
import zhLocaleData from 'react-intl/locale-data/zh';
import defaultMessages from './i18n/default';
import zhMessages from './i18n/zh';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';


//redux inject
const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(
    applyMiddleware(
      ReduxThunk,
      routerMiddleware(history)
    )
  )
)

addLocaleData(zhLocaleData);

const locale = window.localStorage.getItem('locale') || defaultMessages.locale;
const messageMap = {
  'zh': zhMessages.messages,
  'en': defaultMessages.messages
};
const localeMap = {
  'zh': zhCN,
  'en': enUS
}


ReactDOM.render(
  <IntlProvider locale={locale} messages={messageMap[locale]}>
    <LocaleProvider locale={localeMap[locale]}>
      <Provider store = {store}>
        <ConnectedRouter history = {history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </LocaleProvider>
  </IntlProvider>
  , document.getElementById('root'));

registerServiceWorker();
