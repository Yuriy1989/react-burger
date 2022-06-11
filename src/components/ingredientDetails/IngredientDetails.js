import React from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientDetails from './ingredientDetails.module.css';

export default function IngredientDetails(props) {
  console.log("data", props);
  return (
    <div className={ingredientDetails.modalContainer}>
      <div className={ingredientDetails.closeButton}>
        <CloseIcon type="primary" onClick={onOverlayClick}/>
      </div>
      <p className={` ${ingredientDetails.numberOrder} text text_type_main-default`}>Детали ингредиента</p>
      <p className={` ${ingredientDetails.textIdOrder} text text_type_main-medium `}>идентификатор заказа</p>
      <div className={ingredientDetails.loadImage}></div>
      <p className={` ${ingredientDetails.statusOrder} text text_type_main-default `}>Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
