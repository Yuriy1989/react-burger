export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_SUCCESS_FAILED = 'GET_ORDER_DETAILS_SUCCESS_FAILED';
export const CALC_PRICE_ORDER_DETAILS = 'CALC_PRICE_ORDER_DETAILS';
export const SET_SELECTED_ID_INGREDIENTS = 'SET_SELECTED_ID_INGREDIENTS';

import { api } from '../../utils/Api';

export const getOrderDetails = (data) => {
  return(dispatch) => {
    dispatch({
      type: GET_ORDER_DETAILS,
    })
    api.setOrderDetails(data)
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: res.order
          })
        } else {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS_FAILED
        })
      })
  }
}

export const calcPrice = (data) => {
  return(dispatch) => {
    dispatch({
      type: CALC_PRICE_ORDER_DETAILS,
      payload: data
    })
  }
}

export const setSelectedId = (data) => {
  return(dispatch) => {
    dispatch({
      type: SET_SELECTED_ID_INGREDIENTS,
      payload: data
    })
  }
}
