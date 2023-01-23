import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: {
    wsUrl?: string;
  }
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload?: any;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload?: any;
}

export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
  readonly payload?: any;
}

export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload?: any;
}

export type TWsSoccetActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClose
  | IWsGetOrders;

export const connectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: {
    wsUrl: ''
  }
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
