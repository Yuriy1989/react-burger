// import { applyMiddleware, configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: {},
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
  connectionStart,
  connectionSuccess,
  connectionError,
  connectionClose,
  getOrders
} from '../actions/actionUserOrders';

const wsActions = {
  wsInit: connectionStart,
  onOpen: connectionSuccess,
  onClose: connectionError,
  onError: connectionClose,
  onOrders: getOrders
};

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducers, enhancer);
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

type TApplicationActions = TWsSocketActions | TIngredientsApi | TAuth | TModals | TOrderDetails;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;

