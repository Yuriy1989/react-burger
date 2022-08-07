import { createSlice } from '@reduxjs/toolkit';

// import { GET_INGREDIENTS_API } from '../actions/ingredients';
// import { INGREDIENTS_IN_BURGER_CONSTRUCTOR } from '../actions/ingredients';

// const initialState = {
//   ingredientsGetApi: [], //список всех полученных ингредиентов
//   ingredientForConstructor: [], //список всех ингредиентов в текущем конструкторе бургера
//   openIngredient: {
//     calories: 1,
//     carbohydrates: 1,
//     fat: 1,
//     id: "1",
//     image: "https://code.s3.yandex.net/react/code/bun-02.png",
//     image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
//     image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//     name: "булка",
//     price: 1,
//     proteins: 1,
//     type: "bun"
//   }, //объект текущего просматриваемого ингредиента,
//   orderDetails: {
//     numberOrder: 1, //объект созданного заказа
//   }
// }

// export const getIngredientsApi = ( state = defaultState, action ) => {
//   switch (action.type) {
//     case GET_INGREDIENTS_API: {
//       const ingredients = action.payload;
//       return { ...state, ingredientsGetApi: ingredients }
//     }
//     case INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
//       const ingredients = action.payload;
//       return { ...state, ingredientForConstructor: ingredients }
//     }
//     default:
//       return state
//   }
// }

const initialState1 = {
  ingredientsGetApi: [], //список всех полученных ингредиентов
  ingredientForConstructor: [], //список всех ингредиентов в текущем конструкторе бургера
  openIngredient: {}, //объект текущего просматриваемого ингредиента,
  orderDetails: {} //объект созданного заказа
}

export const ingredientsSlice = createSlice ({
  name: 'ingredients',
  initialState: {
    value: []
  },
  reducers: {
    GET_INGREDIENTS_API: (state) => {
      console.log("state",state.value);
      state.value = action.payload
    },
    INGREDIENTS_IN_BURGER_CONSTRUCTOR: (state) => {
      state.ingredientForConstructor = action.payload
    }
  },
})

export const { GET_INGREDIENTS_API } = ingredientsSlice.actions;
export default ingredientsSlice.reducer
