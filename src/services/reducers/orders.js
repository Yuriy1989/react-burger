import { actionRefreshAccessToken } from '../actions/actionsAuthorization';
import {
  GET_ORDERS_API,
  GET_ORDERS_API_SUCCESS,
  GET_ORDERS_API_FAILED,
  GET_USER_ORDERS_API,
  GET_USER_ORDERS_API_SUCCESS,
  GET_USER_ORDERS_API_FAILED
} from '../actions/actionsOrders';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  orders: [],
  userOrders: []
}

export const orders = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORDERS_API: {
      return {
        ...state, feedRequest: true, feedFailed: false
      };
    }
    case GET_ORDERS_API_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        feedRequest: false,
        orders: data
      };
    }
    case GET_ORDERS_API_FAILED: {
      return {
        ...state,
        feedRequest: false,
        feedFailed: true
      };
    }
    case GET_USER_ORDERS_API: {
      return {
        ...state, feedRequest: true, feedFailed: false
      };
    }
    case GET_USER_ORDERS_API_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        feedRequest: false,
        userOrders: data
      };
    }
    case GET_USER_ORDERS_API_FAILED: {
      return {
        ...state,
        feedRequest: false,
        feedFailed: true
      };
    }
    default:
      return state;
  }
}
