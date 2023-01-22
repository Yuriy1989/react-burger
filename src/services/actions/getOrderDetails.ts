import { deleteAllIngredientsForBurgerAction } from './ingredients';
import { api } from '../../utils/Api';
import {
  CALC_PRICE_ORDER_DETAILS,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_SUCCESS_FAILED,
  GET_USER_ORDER_DETAILS,
  GET_USER_ORDER_DETAILS_SUCCESS,
  GET_USER_ORDER_DETAILS_SUCCESS_FAILED,
  SET_SELECTED_ID_INGREDIENTS
} from '../constants';
import { AppDispatch } from '../store/store';

export interface ICALC_PRICE_ORDER_DETAILS {
  payload: any;
  type: typeof CALC_PRICE_ORDER_DETAILS;
}

export interface IGET_ORDER_DETAILS {
  type: typeof GET_ORDER_DETAILS;
}

export interface IGET_ORDER_DETAILS_SUCCESS {
  payload: any;
  type: typeof GET_ORDER_DETAILS_SUCCESS;
}

export interface IGET_ORDER_DETAILS_SUCCESS_FAILED {
  type: typeof GET_ORDER_DETAILS_SUCCESS_FAILED;
}

export interface IGET_USER_ORDER_DETAILS {
  type: typeof GET_USER_ORDER_DETAILS;
}

export interface IGET_USER_ORDER_DETAILS_SUCCESS {
  payload: any;
  type: typeof GET_USER_ORDER_DETAILS_SUCCESS;
}

export interface IGET_USER_ORDER_DETAILS_SUCCESS_FAILED {
  type: typeof GET_USER_ORDER_DETAILS_SUCCESS_FAILED;
}

export interface ISET_SELECTED_ID_INGREDIENTS {
  payload: any;
  type: typeof SET_SELECTED_ID_INGREDIENTS;
}

export type TOrderDetails =
  | ICALC_PRICE_ORDER_DETAILS
  | IGET_ORDER_DETAILS
  | IGET_ORDER_DETAILS_SUCCESS
  | IGET_ORDER_DETAILS_SUCCESS_FAILED
  | IGET_ORDER_DETAILS_SUCCESS_FAILED
  | IGET_USER_ORDER_DETAILS
  | IGET_USER_ORDER_DETAILS_SUCCESS
  | IGET_USER_ORDER_DETAILS_SUCCESS_FAILED
  | ISET_SELECTED_ID_INGREDIENTS;

interface IData {
  data: any
}

interface IAccessToken {
  accessToken: string | undefined
}

interface IId {
  id: any
}

//отправка заказа на космическую базу для приготовления
export const getOrderDetails = (data: IData, accessToken: IAccessToken) => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_DETAILS,
    })
    api.setOrderDetails(data, accessToken)
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: res.order
          })
          dispatch(deleteAllIngredientsForBurgerAction());
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

//получение информации о заказе с сервера
export const getOrderUserDetails = (id: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_ORDER_DETAILS
    })
    api.getOrderUserDetails(id)
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: GET_USER_ORDER_DETAILS_SUCCESS,
            payload: res
          })
        } else {
          dispatch({
            type: GET_USER_ORDER_DETAILS_SUCCESS_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: GET_USER_ORDER_DETAILS_SUCCESS_FAILED
        })
      })
  }
}

export const calcPrice = (data: IData) => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: CALC_PRICE_ORDER_DETAILS,
      payload: data
    })
  }
}

export const setSelectedId = (data: IData) => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: SET_SELECTED_ID_INGREDIENTS,
      payload: data
    })
  }
}
