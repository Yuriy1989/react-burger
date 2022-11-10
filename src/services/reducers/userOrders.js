import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_USER_ORDERS
} from '../actions/actionUserOrders';

const defaultState = {
  wsConnected: false,
  messages: [],
  error: undefined
};

export const userOrders = (state = defaultState, action) => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS: {
      // console.log('action.payload', action.payload);
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      // console.log('action.payload', action.payload);
      const data = action.payload;
      return {
        ...state,
        error: data,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSE: {
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    }
    case WS_GET_USER_ORDERS : {
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload]
      };
    }
    default:
      return state;
  }
}
