import {
  CALC_PRICE_ORDER_DETAILS,
  SET_SELECTED_ID_INGREDIENTS,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_SUCCESS_FAILED,
} from '../actions/getOrderDetails';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  price: 0,
  selectedIdIgredients: [],
  infoOderDetails: {}
}

export const getInfoOrderDetails = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS: {
      return {...state, feedRequest: true, feedFailed: false}
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      const dataOrder = action.payload;
      return {...state, feedRequest: false, infoOderDetails: dataOrder}
    }
    case GET_ORDER_DETAILS_SUCCESS_FAILED: {
      return {...state, feedRequest: false, feedFailed: true}
    }
    case CALC_PRICE_ORDER_DETAILS: {
      const price = action.payload;
      return {...state, price: price}
    }
    case SET_SELECTED_ID_INGREDIENTS: {
      const price = action.payload;
      return {...state, selectedIdIgredients: price}
    }
    default:
      return state
  }
}