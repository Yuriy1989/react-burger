import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import style, { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import ingredientItem from './ingredientItem.module.css';
import { ingredientTypes } from '../../utils/types';
import { openInfoSelectedInrgedient } from '../../services/actions/getIngredientforOpenModal';
import { useDrag } from "react-dnd";
import uuid from 'react-uuid';

export default function IngredientItem ( {item} ) {

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const dispatch = useDispatch();
  const countData = useSelector(state => state.getIngredientsApi.ingredientForConstructor);

  //результат подсчета кол-ва элементов отобранных для бургера
  const result = {};
  // for (let i = 0; i < countData.length; ++i) {
  //   let a = countData[i].id;
  //   if (result[a] != undefined) {
  //     ++result[a];
  //   }
  //   else
  //     result[a] = 1;
  // }

  const handleClick = () => dispatch(openInfoSelectedInrgedient(item));

  return (
    !isDrag &&
      <li ref={dragRef} className={ingredientItem.item}>
        <img onClick={handleClick} className={ingredientItem.image} src={item.image}></img>
        <div className={ingredientItem.counter}>
          {/* {countData.map(check => (check.id === item.id &&
            <Counter key={uuid()} count={result[item.id]} size="default" /> ))
          } */}
        </div>
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
}
