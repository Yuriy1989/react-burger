import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';

export interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START;
  wsUrl?: string;
  payload?: any;
}

export interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
  payload?: any;
}

export interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload?: any;
}

export interface IWsConnectionClose {
  type: typeof WS_CONNECTION_CLOSE;
  payload?: any;
}

export interface IWsGetOrders {
  type: typeof WS_GET_ORDERS;
  payload?: any;
}

export type TWsSocketActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClose
  | IWsGetOrders;

export const connectionStart = (wsUrl?: string): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  wsUrl,
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

