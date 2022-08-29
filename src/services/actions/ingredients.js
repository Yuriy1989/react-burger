

//экшен для отправки запроса на сервер
export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
//экшен для при получение положительного ответа от сервера
export const GET_INGREDIENTS_API_SUCCESS = 'GET_INGREDIENTS_API_SUCCESS';
//экшен для при получение отрицательно ответа от сервера
export const GET_INGREDIENTS_API_FAILED = 'GET_INGREDIENTS_API_FAILED';
//экшен для отправки запроса на сервер
export const INGREDIENTS_IN_BURGER_CONSTRUCTOR = 'INGREDIENTS_IN_BURGER_CONSTRUCTOR';


//генератор экшенов - запрос по API для получения всех ингредиентов для бургера
export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_API
    })
    fetch('https://norma.nomoreparties.space/api/ingredients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_API_SUCCESS,
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
      } else {
          dispatch({
            type: GET_INGREDIENTS_API_FAILED
          })
        }
    }).catch(err => {
      dispatch({
        type: GET_INGREDIENTS_API_FAILED
      })
    })
  }
}

export const getIngredientsForConstructor = (data) => {
  return (dispatch) => {
    let selectedIngredients = data.length > 0 ? data.filter(item => item.type == 'main') : [];  // Фильтруем по начинке
    selectedIngredients.push(data.length > 0 ? data.find(item => item.type == 'bun') : []); // Фильтруем по булке
    dispatch({
      type: INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      payload: selectedIngredients
    })
  }
}


