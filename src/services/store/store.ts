// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: { rootReducers },
// })
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from '../reducers/rootReducers';
import { socketMiddleware } from '../middleware/socketMiddleWare';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TWsSocketActions } from '../actions/actionUserOrders';
import { TIngredientsApi } from '../actions/ingredients';
import { TAuth } from '../actions/actionsAuthorization';
import { TModals } from '../actions/getIngredientforOpenModal';
import { TOrderDetails } from '../actions/getOrderDetails';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_ERROR,
  onError: WS_CONNECTION_CLOSE,
  onOrders: WS_GET_ORDERS
};

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducers, enhancer);
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

type TApplicationActions = TWsSocketActions | TIngredientsApi | TAuth | TModals | TOrderDetails;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
