import { GET_INGREDIENTS_API } from '../actions/ingredients';
import { INGREDIENTS_IN_BURGER_CONSTRUCTOR } from '../actions/ingredients';

const defaultState = {
  ingredientsGetApi: [],
  ingredientInConstructor: [],
  openIngredient: {
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
  },
  orderDetails: {
    numberOrder: 1,
  }
}




export const ingredientsApi = ( state = defaultState, action ) => {
  switch (action.type) {
    case GET_INGREDIENTS_API: {
      const ingredientsApi = action.payload
      return {...state, ingredientsGetApi: ingredientsApi}
    }
    default:
      return state
  }
}
