import {
  OPEN_SELECTED_INGREDIENT,
  CLOSE_MODALS,
  OPEN_ORDER_DETAILS,
  OPEN_BURGER_DETAILS,
  OPEN_ORDER_ERROR,
} from "../constants"
import { AppDispatch, AppThunk } from "../store/store"
import { IData } from "../types"

interface IOPEN_SELECTED_INGREDIENT {
  type: typeof OPEN_SELECTED_INGREDIENT,
  payload: Array<IData>,
}

interface ICLOSE_MODALS {
  type: typeof CLOSE_MODALS,
}

interface IOPEN_ORDER_DETAILS {
  type: typeof OPEN_ORDER_DETAILS,
}

interface IOPEN_BURGER_DETAILS {
  type: typeof OPEN_BURGER_DETAILS,
}

interface IOPEN_ORDER_ERROR {
  type: typeof OPEN_ORDER_ERROR,
}

export type TModals =
  | IOPEN_SELECTED_INGREDIENT
  | ICLOSE_MODALS
  | IOPEN_ORDER_DETAILS
  | IOPEN_BURGER_DETAILS
  | IOPEN_ORDER_ERROR

export const openInfoSelectedInrgedient: AppThunk = (ingredient) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_SELECTED_INGREDIENT,
      payload: ingredient,
    })
  }
}

export const openOrderDetails: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_ORDER_DETAILS,
    })
  }
}

export const openBurgerDetails: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_BURGER_DETAILS,
    })
  }
}

export const openOrderError: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: OPEN_ORDER_ERROR,
    })
  }
}

export const closeModal: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: CLOSE_MODALS,
    })
  }
}
