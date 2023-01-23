import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_SUCCESS,
  GET_INGREDIENTS_API_FAILED,
  INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
  DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../constants';
import { api } from '../../utils/Api';
import uuid from 'react-uuid';
import { AppDispatch } from '../store/store';

export interface IGET_INGREDIENTS_API {
  type: typeof GET_INGREDIENTS_API;
}

export interface IGET_INGREDIENTS_API_SUCCESS {
  type: typeof GET_INGREDIENTS_API_SUCCESS;
  payload?: any;
}

export interface IGET_INGREDIENTS_API_FAILED {
  type: typeof GET_INGREDIENTS_API_FAILED;
  payload?: any;
}

export interface IINGREDIENTS_IN_BURGER_CONSTRUCTOR {
  type: typeof INGREDIENTS_IN_BURGER_CONSTRUCTOR;
  payload?: any;
}

export interface ISORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR {
  hoverIndex: any;
  dragIndex: any;
  type: typeof SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR;
  payload?: any;
}

export interface IDELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR {
  type: typeof DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR;
  payload?: any;
}

export interface IDELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR {
  type: typeof DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR;
  payload?: any;
}

export type TIngredientsApi =
  | IGET_INGREDIENTS_API
  | IGET_INGREDIENTS_API_SUCCESS
  | IGET_INGREDIENTS_API_FAILED
  | IINGREDIENTS_IN_BURGER_CONSTRUCTOR
  | ISORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR
  | IDELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR
  | IDELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR;

interface IIngredients {
  _id: any;
  name: any;
  price: any;
  type: any;
  image: any;
  image_mobile: any;
  image_large: any;
  proteins: any;
  fat: any;
  carbohydrates: any;
  calories: any;
}

//генератор экшенов - запрос по API для получения всех ингредиентов для бургера
export const getIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_API
    })
    api.getIngridients()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_API_SUCCESS,
            payload: res.data.map((item: IIngredients) => {
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
export const selectedIngredientsForBurgerAction = (data: any) => {
  const indexIngredient = uuid();
  return(dispatch: AppDispatch) => {
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
export const sortSelectedIngredientsForBurgerAction = (dragIndex: any, hoverIndex: any) => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: SORT_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    })
  }
}

//экшен по удалению выбранных ингредиентов для бургера
export const deleteSelectedIngredientsForBurgerAction = (data: any) => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: DELETE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
      payload: data
    })
  }
}

//экшен для удаления всех ингредиентов из собираемого бургера
export const deleteAllIngredientsForBurgerAction = () => {
  return(dispatch: AppDispatch) => {
    dispatch({
      type: DELETE_ALL_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
    })
  }
}
