import { TIngredientsApi } from '../actions/ingredients';
import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_FAILED,
  INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../constants';
import { IData } from '../types';

type TIngredients = {
  data: IData,
  indexIngredient: string,
}

type TIngredientForConstructor = {
  bun: Array<TIngredients>,
  others: Array<TIngredients>,
}

type TDefaultState = {
  feedRequest: boolean,
  feedFailed: boolean,
  ingredientsGetApi: Array<IData>,
  ingredientForConstructor: TIngredientForConstructor,
}

const defaultState: TDefaultState = {
  feedRequest: false,
  feedFailed: false,
  ingredientsGetApi: [], //список всех полученных ингредиентов
  ingredientForConstructor: { //список всех ингредиентов в текущем конструкторе бургера
    bun: [],
    others: [],
  },
}

export const ingredientsName = { bun: 'bun', main: 'main', sauce: 'sauce' };

export const getIngredientsApi = ( state = defaultState, action: TIngredientsApi ): TDefaultState => {
  switch (action.type) {
    case GET_INGREDIENTS_API: {
      return { ...state, feedRequest: true, feedFailed: false };
    }
    case GET_INGREDIENTS_API_SUCCESS: {
      return {
        ...state,
        ingredientsGetApi: action.payload,
        feedRequest: false
      };
    }
    case GET_INGREDIENTS_API_FAILED: {
      return { ...state, feedFailed: true, feedRequest: false};
    }
    case INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      //Ищем булку в текущем добавляемом ингредиенте
      if (action.payload.data.type === ingredientsName.bun) { //если добавляем ингредиент Булку
        return {
          ...state,
          ingredientForConstructor: {
            ...state.ingredientForConstructor,
            bun: [action.payload],
          }
        }
      } else {
        return {
          ...state,
          ingredientForConstructor: {
            ...state.ingredientForConstructor,
            others: [...state.ingredientForConstructor.others, action.payload]
          },
        }
      }
    }
    case SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const masIngregients = state.ingredientForConstructor.others;
      const t = masIngregients.splice(dragIndex, 1)[0];
      const e = masIngregients.splice(hoverIndex, 0, t);
      const newMas: Array<TIngredients> = masIngregients.slice();
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
