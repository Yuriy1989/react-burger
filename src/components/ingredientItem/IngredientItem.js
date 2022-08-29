import React, { useState } from 'react';

import PropTypes from 'prop-types';
import style, { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import ingredientItem from './ingredientItem.module.css';
import { ingredientTypes, funcTypes } from '../../utils/types';
import { openInfoSelectedInrgedient } from '../../services/actions/getIngredientforOpenModal';

export default function IngredientItem ( {item, onOpenModal} ) {

  const handleClick = () => onOpenModal(item);

  const dispatch = useDispatch();

  const handleClick2 = dispatch(openInfoSelectedInrgedient(item));

  return (
    <li className={ingredientItem.item}>
      <img onClick={handleClick2} className={ingredientItem.image} src={item.image}></img>

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
