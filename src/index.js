import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { rootReducers } from './services/reducers/rootReducers';
import { socketMiddleware } from './services/middleware/socketMiddleWare';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_USER_ORDERS
} from './services/actions/actionUserOrders';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSE,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_USER_ORDERS
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducers, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
