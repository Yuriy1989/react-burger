import { api } from '../../utils/Api';

export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
export const INGREDIENTS_IN_BURGER_CONSTRUCTOR = 'INGREDIENTS_IN_BURGER_CONSTRUCTOR';

export const getIngredients = () => {
  return (dispatch) => {
    api.getIngridients()
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_API,
          payload: res.data.map((item) => {
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
        })
      })
      .catch(console.log);
  }
}

export const getIngredientsForConstructor = (data) => {
  return (dispatch) => {
    let selectedIngredients = data.length > 0 ? data.filter(item => item.type == 'main') : [];  // Фильтруем по начинке
    selectedIngredients.push(data.length > 0 ? data.find(item => item.type == 'bun') : []);
    dispatch({
      type: INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      payload: selectedIngredients
    })
  }
}


