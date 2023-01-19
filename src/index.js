import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import { rootReducers } from './services/reducers/rootReducers';
import { socketMiddleware } from './services/middleware/socketMiddleWare';
import {
  connectionStart,
  connectionSuccess,
  connectionError,
  connectionClose,
  getOrders
} from './services/actions/actionUserOrders';

const wsActions = {
  wsInit: connectionStart,
  onOpen: connectionSuccess,
  onClose: connectionError,
  onError: connectionClose,
  onOrders: getOrders
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

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
