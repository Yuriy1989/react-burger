import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_ORDERS,
} from '../constants';
import { TOrders } from '../reducers/orders';

export interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START;
  payload: {
    wsUrl?: string;
  }
}

export interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload: string,
}

export interface IWsConnectionClose {
  type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsGetOrders {
  payload: TOrders;
  type: typeof WS_GET_ORDERS;

}

export type TWsSocketActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClose
  | IWsGetOrders;

export const connectionStart = (wsUrl?: string): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: {
    wsUrl: wsUrl
  }
});

export const connectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS

});

export const connectionError = (data: string): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload: data
});

export const connectionClose = (): IWsConnectionClose => ({
  type: WS_CONNECTION_CLOSE
});

export const getOrders = (data: Array<TOrders>): IWsGetOrders => ({
  type: WS_GET_ORDERS,
  payload: [data]
});

