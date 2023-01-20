// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
// import { socketMiddleware } from './middleware/socketMiddleWare';

// import {
//   connectionStart,
//   connectionSuccess,
//   connectionError,
//   connectionClose,
//   getOrders
// } from './actions/actionUserOrders';

// const store = configureStore({
//   reducer: {},
// })
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './reducers/rootReducers';
import { socketMiddleware } from './middleware/socketMiddleWare';

import {
  connectionStart,
  connectionSuccess,
  connectionError,
  connectionClose,
  getOrders
} from './actions/actionUserOrders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsActions = {
  wsInit: connectionStart,
  onOpen: connectionSuccess,
  onClose: connectionError,
  onError: connectionClose,
  onOrders: getOrders
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducers, enhancer);
