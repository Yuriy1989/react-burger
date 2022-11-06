import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientTypes } from '../../utils/types';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import orderElement from './orderElement.module.css';
import uuid from 'react-uuid';

export default function OrderElement({ item, countData }) {

  const [count, setCount] = useState({}); //объект типа {ID:количество} в массиве countData

  //результат подсчета кол-ва элементов отобранных для бургера
  const caclCount = () => {
    let result = {};
    setCount(result);
    for (let i = 0; i < countData.length; ++i) {
      let a = countData[i].id;
      if (result[a] != undefined) {
        ++result[a];
      }
      else
        result[a] = 1;
    }
  }

  useEffect(() => {
    caclCount();
  }, [item])

  return (
    <li>
      <div className={orderElement.filling}>
        {
          countData.filter(card => card.type != 'bun').map(check => (check.id === item.id &&
            <p key={uuid()} className={`${orderElement.count} text text_type_digits-default`}>{count[item.id] === 1 ? '' : '+' + (count[item.id])}</p>
          ))
        }
        <img className={orderElement.image} src={item.image} key={uuid()}></img>
      </div>
    </li>
  )
}

OrderElement.propTypes = {
  item: ingredientTypes.isRequired,
}
