import {
  OPEN_SELECTED_INGREDIENT,
  CLOSE_MODALS,
  OPEN_ORDER_DETAILS,
  OPEN_BURGER_DETAILS,
  OPEN_ORDER_ERROR,
} from "../constants"
import { AppDispatch } from "../store/store"

interface IOPEN_SELECTED_INGREDIENT {
  payload: any,
  type: typeof OPEN_SELECTED_INGREDIENT
}

interface ICLOSE_MODALS {
  type: typeof CLOSE_MODALS
}

interface IOPEN_ORDER_DETAILS {
  type: typeof OPEN_ORDER_DETAILS
}

interface IOPEN_BURGER_DETAILS {
  type: typeof OPEN_BURGER_DETAILS
}

interface IOPEN_ORDER_ERROR {
  type: typeof OPEN_ORDER_ERROR
}

export type TModals =
  | IOPEN_SELECTED_INGREDIENT
  | ICLOSE_MODALS
  | IOPEN_ORDER_DETAILS
  | IOPEN_BURGER_DETAILS
  | IOPEN_ORDER_ERROR

export const openInfoSelectedInrgedient = (data: {}) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_SELECTED_INGREDIENT,
      payload: data
    })
  }
}

export const openOrderDetails = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_ORDER_DETAILS,
    })
  }
}

export const openBurgerDetails = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_BURGER_DETAILS,
    })
  }
}

export const openOrderError = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_ORDER_ERROR,
    })
  }
}

export const closeModal = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: CLOSE_MODALS,
      payload: data
    })
  }
}
