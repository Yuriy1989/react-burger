import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_FAILED,
  INGREDIENTS_IN_BURGER_CONSTRUCTOR
} from '../actions/ingredients';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  ingredientsGetApi: [], //список всех полученных ингредиентов
  ingredientForConstructor: [], //список всех ингредиентов в текущем конструкторе бургера
  orderDetails: {
    numberOrder: 1, //объект созданного заказа
  }
}

export const getIngredientsApi = ( state = defaultState, action ) => {
  switch (action.type) {
    case GET_INGREDIENTS_API: {
      return { ...state, feedRequest: true, feedFailed: false };
    }
    case GET_INGREDIENTS_API_SUCCESS: {
      const ingredients = action.payload;
      return { ...state, ingredientsGetApi: ingredients, feedRequest: false};
    }
    case GET_INGREDIENTS_API_FAILED: {
      return { ...state, feedFailed: true, feedRequest: false};
    }
    case INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      const ingredients = action.payload;
      return { ...state, ingredientForConstructor: ingredients };
    }
    default:
      return state
  }
}
