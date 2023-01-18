import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';

import { TWsSoccetActions } from '../actions/actionUserOrders';

// import {
//   WS_CONNECTION_SUCCESS,
//   WS_CONNECTION_ERROR,
//   WS_CONNECTION_CLOSE,
//   WS_GET_ORDERS
// } from '../actions/actionUserOrders';

type TDefaultState = {
  wsConnected: boolean,
  orders: any[],
  error: string | undefined,
  request: boolean,
  feedRequest: boolean,
  feedFailed: boolean,
};

const defaultState: TDefaultState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  request: false,
  feedRequest: false,
  feedFailed: false
};

export const orders = (state = defaultState, action: TWsSoccetActions): TDefaultState => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        request: false,
        wsConnected: true,
        feedRequest: true
      };
    }
    case WS_CONNECTION_ERROR: {
      // const data = action.payload;
      return {
        ...state,
        // error: data,
        error: "data",
        wsConnected: false,
        feedRequest: false,
        feedFailed: true
      };
    }
    case WS_CONNECTION_CLOSE: {
      return {
        ...state,
        error: undefined,
        request: true,
        feedRequest: false,
        wsConnected: true,
      };
    }
    case WS_GET_ORDERS : {
      return {
        ...state,
        error: undefined,
        // orders: [action.payload],
        orders: [],
        feedRequest: false,
      };
    }
    default:
      return state;
  }
}
