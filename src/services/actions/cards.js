export const GET_CARDS_API = 'GET_CARDS';

import { api } from '../../utils/Api';

export const getCards = () => {
  return (dispatch) => {
    api.getIngridients()
      .then(res => {
        dispatch({
          type: GET_CARDS_API,
          payload: {
            cards: res.data.map((item) => {
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
