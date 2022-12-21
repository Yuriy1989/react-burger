import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_FAILED,
  INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../actions/ingredients';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  ingredientsGetApi: [], //список всех полученных ингредиентов
  ingredientForConstructor: { //список всех ингредиентов в текущем конструкторе бургера
    bun: [],
    others: []
  },
}

export const ingredientsName = { bun: 'bun', main: 'main', sauce: 'sauce' };

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
      //Ищем булку в текущем добавляемом ингредиенте
      if (ingredients.type === ingredientsName.bun) { //если добавляем ингредиент Булку
        return {
          ...state,
          ingredientForConstructor: {
            ...state.ingredientForConstructor,
            bun: [ingredients],
          }
        }
      } else {
        return {
          ...state,
          ingredientForConstructor: {
            ...state.ingredientForConstructor,
            others: [...state.ingredientForConstructor.others, ingredients]
          },
        }
      }
    }
    case SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const newMas = state.ingredientForConstructor.others.slice(state.ingredientForConstructor.others.splice(hoverIndex, 0, state.ingredientForConstructor.others.splice(dragIndex, 1)[0]));
      return {
        ...state,
        ingredientForConstructor: {
          ...state.ingredientForConstructor,
          others: [...newMas]
        }
      }
    }
    case DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      const data = action.payload;
      return {
        ...state,
        ingredientForConstructor: {
          ...state.ingredientForConstructor,
          others: [...state.ingredientForConstructor.others.filter((item, index) => (index !== data))]
        }
      }
    }
    case DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        ingredientForConstructor: {
          ...state.ingredientForConstructor,
          bun: [],
          others: [],
        }
      }
    }
    default:
      return state
  }
}
