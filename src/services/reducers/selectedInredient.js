//экшен для открытия модалки при нажатии на ингредиент
import {
  OPEN_SELECTED_INRGEDIENT,
  CLOSE_MODALS,
  OPEN_ORDER_DETAILS,
  OPEN_ORDER_ERROR
}
  from '../actions/getIngredientforOpenModal';

const defaultState = {
  openModal: false, //состояние открыто ли модальное окно
  openModalOrder: false, //состояние открыто ли модальное окно номера заказа
  openModalError: false, //состояние открыто ли модальное окно с инфомацией об ошибке
  openModalIngredient: {} //объект текущего просматриваемого ингредиента
}

export const openInfoSelectedIngredient = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_SELECTED_INRGEDIENT: {
      const selectedInrgedient = action.payload;
      return {...state, openModalIngredient: selectedInrgedient, openModal: true}
    }
    case CLOSE_MODALS: {
      return {...state, openModal: false, openModalOrder: false, openModalError: false}
    }
    case OPEN_ORDER_DETAILS: {
      return {...state, openModalOrder: true}
    }
    case OPEN_ORDER_ERROR: {
      return {...state, openModalError: true}
    }
    default:
      return state
  }
}
