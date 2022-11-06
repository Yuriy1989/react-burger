export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS';

export const wsConnectionsSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
}

export const wsConnectionsError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
}

export const wsConnectionsClose = () => {
  return {
    type: WS_CONNECTION_CLOSE
  };
}

export const wsGetUserOrders = () => {
  return {
    type: WS_GET_USER_ORDERS
  };
}
