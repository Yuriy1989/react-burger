import React from 'react';
import ReactDOM from 'react-dom';
import ingredientDetails from './ingredientDetails.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {

  const ingredient = useSelector((state) => state.getInfoSelectedIngredient.openModalIngredient);

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
