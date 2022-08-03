export const GET_INRGEDIENTS_API = 'GET_INRGEDIENTS_API';

import { api } from '../../utils/Api';

export const getIngredients = () => {
  return (dispatch) => {
    api.getIngridients()
      .then(res => {
        dispatch({
          type: GET_INRGEDIENTS_API,
          payload: {
            ingredients: res.data.map((item) => {
              return {
                id: item._id,
                name: item.name,
                price: item.price,
                type: item.type,
                image: item.image,
                image_mobile: item.image_mobile,
                image_large: item.image_large,
                proteins: item.proteins,
                fat: item.fat,
                carbohydrates: item.carbohydrates,
                calories: item.calories
              }
            })
          },
        })
      })

      .catch(console.log);
  }
}