import { GET_INRGEDIENTS_API } from '../actions/ingredients';

const defaultIngredient = {
  ingredients: {
    ingredients: [{
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
    }]
  } 
}

export const ingredientsApi = ( state = defaultIngredient, action ) => {
  switch (action.type) {
    case GET_INRGEDIENTS_API: {
      const ingredientsApi = action.payload
      return {...state, ingredients: ingredientsApi}
    }
    default:
      return state
  }
}
