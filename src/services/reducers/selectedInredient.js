//экшен для открытия модалки при нажатии на ингредиент
import { OPEN_SELECTED_INRGEDIENT, CLOSE_SELECTED_INRGEDIENT } from '../actions/getIngredientforOpenModal';

const defaultState = {
  openModal: false,
  openModalIngredient: {
    calories: 1,
    carbohydrates: 1,
    fat: 1,
    id: "1",
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "булка",
    price: 1,
    proteins: 1,
    type: "bun"
  }, //объект текущего просматриваемого ингредиента
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
