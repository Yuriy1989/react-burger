import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';

import { TWsSocketActions } from '../actions/actionUserOrders';
import { ICard } from '../types';

type TOrders = {
  orders: Array<ICard>,
  total: number,
  totalToday: number,
}

type TDefaultState = {
  wsConnected: boolean,
  data: Array<TOrders>,
  error: string | undefined,
  request: boolean,
  feedRequest: boolean,
  feedFailed: boolean,
};

const defaultState: TDefaultState = {
  wsConnected: false,
  data: [],
  error: undefined,
  request: false,
  feedRequest: false,
  feedFailed: false
};

export const orders = (state = defaultState, action: TWsSocketActions): TDefaultState => {
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
      return {
        ...state,
        error: action.payload,
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
        data: [action.payload],
        feedRequest: false,
      };
    }
    default:
      return state;
  }
}
