import React, { useState } from 'react';

import PropTypes from 'prop-types';
import style, { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItem from './ingredientItem.module.css';
import { ingredientTypes, funcTypes } from '../../utils/types';

export default function IngredientItem ( {item, onOpenModal} ) {

  // const getCards = (cards) => {
  //   dispatch({
  //     type: GET_CARDS_API,
  //     payload: {
  //       id: item._id,
  //       name: item.name,
  //       price: item.price,
  //       type: item.type,
  //       image: item.image,
  //       image_mobile: item.image_mobile,
  //       image_large: item.image_large,
  //       proteins: item.proteins,
  //       fat: item.fat,
  //       carbohydrates: item.carbohydrates,
  //       calories: item.calories
  //     }
  //   })
  //   console.log(text);
  // }



  const handleClick = () => onOpenModal(item);

  return (
    <li className={ingredientItem.item}>
      <img onClick={handleClick} className={ingredientItem.image} src={item.image}></img>

      <div className={ingredientItem.price}>
        <p className={` ${ingredientItem.cost} text text_type_digits-default`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={` ${ingredientItem.name} text text_type_main-default`}>{item.name}</p>
    </li>
  );
}

IngredientItem.propTypes = {
  item: ingredientTypes.isRequired,
  onOpenModal: funcTypes.isRequired
}
