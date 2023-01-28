//экшен для открытия модалки при нажатии на ингредиент
import { TModals } from "../actions/getIngredientforOpenModal";
import {
  OPEN_SELECTED_INGREDIENT,
  CLOSE_MODALS,
  OPEN_ORDER_DETAILS,
  OPEN_BURGER_DETAILS,
  OPEN_ORDER_ERROR,
} from "../constants"

type TDefaultState = {
  openModal: boolean,
  openModalOrder: boolean,
  openModalError: boolean,
  // openModalIngredient: {},
}

const defaultState: TDefaultState = {
  openModal: false, //состояние открыто ли модальное окно
  openModalOrder: false, //состояние открыто ли модальное окно номера заказа
  openModalError: false, //состояние открыто ли модальное окно с инфомацией об ошибке
  // openModalIngredient: {}, //объект текущего просматриваемого ингредиента
}

export const openInfoSelectedIngredient = (state = defaultState, action: TModals): TDefaultState  => {
  switch (action.type) {
    case OPEN_SELECTED_INGREDIENT: {
      // const selectedIngredient = action.payload;
      return {...state, openModal: true}
    }
    case CLOSE_MODALS: {
      return {...state, openModal: false, openModalOrder: false, openModalError: false}
    }
    case OPEN_ORDER_DETAILS: {
      return {...state, openModalOrder: true}
    }
    case OPEN_BURGER_DETAILS: {
      return {...state, openModalOrder: true}
    }
    case OPEN_ORDER_ERROR: {
      return {...state, openModalError: true}
    }
    default:
      return state
  }
}
