//экшен для открытия модалки при нажатии на ингредиент
import { OPEN_SELECTED_INRGEDIENT, CLOSE_SELECTED_INRGEDIENT } from '../actions/getIngredientforOpenModal';

const defaultState = {
  openModal: false, //состояние открыто ли модальное окно
  openModalIngredient: {} //объект текущего просматриваемого ингредиента
}

export const openInfoSelectedIngredient = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_SELECTED_INRGEDIENT: {
      const selectedInrgedient = action.payload;
      return {...state, openModalIngredient: selectedInrgedient, openModal: true}
    }
    case CLOSE_SELECTED_INRGEDIENT: {
      return {...state, openModal: false}
    }
    default:
      return state
  }
}
