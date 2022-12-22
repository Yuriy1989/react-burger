

//экшен для отправки запроса на сервер
export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
//экшен для при получение положительного ответа от сервера
export const GET_INGREDIENTS_API_SUCCESS = 'GET_INGREDIENTS_API_SUCCESS';
//экшен для при получение отрицательно ответа от сервера
export const GET_INGREDIENTS_API_FAILED = 'GET_INGREDIENTS_API_FAILED';
//экшен для сборки ингредиентов для бургера
export const INGREDIENTS_IN_BURGER_CONSTRUCTOR = 'INGREDIENTS_IN_BURGER_CONSTRUCTOR';
//экшен для сортировки ингредиентов для бургера
export const SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR = 'SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR';
//экшен для удаления ингредиента из собираемого бургера
export const DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR = 'DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR';
//экшен для удаления всех ингредиентов из собираемого бургера
export const DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR = 'DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR';

import { api } from '../../utils/Api';
import uuid from 'react-uuid';

//генератор экшенов - запрос по API для получения всех ингредиентов для бургера
export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_API
    })
    api.getIngridients()
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

//экшен по сбору выбранных ингредиентов для бургера
export const selectedIngredientsForBurgerAction = (data) => {
  const indexIngredient = uuid();
  return(dispatch) => {
    dispatch({
      type: INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      payload: {
        data,
        indexIngredient,
      }
    })
  }
}

//экшен по сортировке выбранных ингредиентов для бургера
export const sortSelectedIngredientsForBurgerAction = (dragIndex, hoverIndex) => {
  return(dispatch) => {
    dispatch({
      type: SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    })
  }
}

//экшен по удалению выбранных ингредиентов для бургера
export const deleteSelectedIngredientsForBurgerAction = (data) => {
  return(dispatch) => {
    dispatch({
      type: DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      payload: data
    })
  }
}

//экшен для удаления всех ингредиентов из собираемого бургера
export const deleteAllIngredientsForBurgerAction = () => {
  return(dispatch) => {
    dispatch({
      type: DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
    })
  }
}
