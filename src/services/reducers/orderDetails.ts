import { TOrderDetails } from '../actions/getOrderDetails';
import {
  CALC_PRICE_ORDER_DETAILS,
  SET_SELECTED_ID_INGREDIENTS,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_SUCCESS_FAILED,
  GET_USER_ORDER_DETAILS,
  GET_USER_ORDER_DETAILS_SUCCESS,
  GET_USER_ORDER_DETAILS_SUCCESS_FAILED
} from '../constants';

type TCard = {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  owner: string,
  status : string,
  updatedAt: string,
  __v: number,
  _id: string,
}

type TDetails = {
  orders: Array<TCard>,
  success: boolean,
}

type TDefaultState = {
  feedRequest: boolean,
  feedFailed: boolean,
  price: number,
  selectedIdIgredients: any[],
  orderDetails: Array<TDetails>,
  infoOderDetails: {}
}

const defaultState: TDefaultState = {
  feedRequest: false,
  feedFailed: false,
  price: 0,
  selectedIdIgredients: [],
  orderDetails: [],
  infoOderDetails: {}
}

export const getInfoOrderDetails = (state = defaultState, action: TOrderDetails): TDefaultState => {
  switch (action.type) {
    case GET_ORDER_DETAILS: {
      return {...state, feedRequest: true, feedFailed: false}
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {...state, feedRequest: false, infoOderDetails: action.payload}
    }
    case GET_ORDER_DETAILS_SUCCESS_FAILED: {
      return {...state, feedRequest: false, feedFailed: true}
    }
    case CALC_PRICE_ORDER_DETAILS: {
      return {...state, price: action.payload}
    }
    case SET_SELECTED_ID_INGREDIENTS: {
      return {...state, selectedIdIgredients: action.payload}
    }
    case GET_USER_ORDER_DETAILS: {
      return {...state, feedRequest: true, feedFailed: false}
    }
    case GET_USER_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        feedRequest: false,
        orderDetails: [action.payload],
      }
    }
    case GET_USER_ORDER_DETAILS_SUCCESS_FAILED: {
      return {...state, feedRequest: false, feedFailed: true}
    }
    default:
      return state
  }
}
