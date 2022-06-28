import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style, { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientDetails from './ingredientDetails.module.css';
import { ingredientTypes } from '../../utils/types';

export default function IngredientDetails({ ingredient }) {

  return (
    <>
      <img className={ingredientDetails.image} src={ingredient.image_large} alt={ingredient.name}></img>
      <p className={` ${ingredientDetails.name } text text_type_main-medium `}>{ingredient.name}</p>
        <ul className={ingredientDetails.items}>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.calories}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.proteins}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.fat}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.carbohydrates}</p>
          </li>
        </ul>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientTypes.isRequired
}
