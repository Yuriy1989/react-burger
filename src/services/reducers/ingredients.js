import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_FAILED,
  INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../actions/ingredients';

const defaultState = {
  feedRequest: false,
  feedFailed: false,
  ingredientsGetApi: [], //список всех полученных ингредиентов
  ingredientForConstructor: {
    bun: [],
    others: []
  }, //список всех ингредиентов в текущем конструкторе бургера
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
      //Ищем булку в текущем добавляемом ингредиенте
      if (ingredients.type == 'bun') { //если добавляем ингредиент Булку
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
      //Ищем булку в текущем добавляемом ингредиенте
      // if (ingredients.type == 'bun') { //если добавляем ингредиент Булку
      //   console.log('state.ingredientForConstructor = ', state.ingredientForConstructor);
      //   if (state.ingredientForConstructor.find(item => (item.type == 'bun'))) { //проверяем наш стор на наличии в нем уже добавленной булочки
      //     //извлекаем индекс под которым хранится наша булка в сторе
      //     // const indexBun = state.ingredientForConstructor.indexOf(state.ingredientForConstructor.find((item, index) => (item.type == 'bun')));
      //     //заменяем нашу булку в сторе на новую добавленную булку
      //     // state.ingredientForConstructor.map((item, index) => (
      //       // index == indexBun ? (state.ingredientForConstructor.splice(indexBun, 1, ingredients) ) : ''));
      //     return {
      //       ...state,
      //       ingredientForConstructor: {...bun, ingredients}
      //     }
      //   } else { //если добавляем ингредиент булку, но булок еще нет в сторе
      //     return {
      //       ...state,
      //       ingredientForConstructor: [...state.ingredientForConstructor, ingredients]
      //     }
      //   }
      // } else { //игредиент не булка, добавляем ингредиент в общий массив
      //   return {
      //     ...state,
      //     ingredientForConstructor: [...state.ingredientForConstructor, ingredients]
      //   }
      // }
    }
    case DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      const data = action.payload;
      console.log('Index for delete = ', data);
      console.log('state.ingredientForConstructor = ', state.ingredientForConstructor);

      return {
        ...state,
        ingredientForConstructor: state.ingredientForConstructor.filter((item, index) => (index !== data))
      }
    }
    default:
      return state
  }
}
