import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
}

export type TWsSoccetActions =
 | IWsConnectionStart |
  IWsConnectionSuccess |
  IWsConnectionError |
  IWsConnectionClose |
  IWsGetOrders;

export const connectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START
});

export const connectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const connectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR
});

export const connectionClose = (): IWsConnectionClose => ({
  type: WS_CONNECTION_CLOSE
});

export const getOrders = (): IWsGetOrders => ({
  type: WS_GET_ORDERS
});


// export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
// export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
// export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
// export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
// export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
// export const WS_SEND_DATA: 'WS_SEND_DATA' = 'WS_SEND_DATA';

