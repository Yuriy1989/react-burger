import React, { FC, useEffect, useState } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import orderElement from './orderElement.module.css';
import { ICount, IData } from '../../services/types';

const OrderElement: FC<{ item: IData, burger: Array<IData>, countData: Array<IData>, indexStyle: number }> = ({ item, burger, countData, indexStyle }) => {
  const [count, setCount] = useState<ICount>({}); //объект типа {ID:количество} в массиве countData

  //результат подсчета кол-ва элементов отобранных для бургера
  const caclCount = () => {
    let result: ICount = {};
    for (let i = 0; i < countData.length; ++i) {
      let a = countData[i].id;
      if (result[a] != undefined) {
        ++result[a];
      }
      else
        result[a] = 1;
    }
    setCount(result);
  }

  useEffect(() => {
    caclCount();
  }, [countData])

  const styleIndex = {
    margin: "0 0 0 -20px",
    zIndex: indexStyle
  }

  return (
    <li style={styleIndex}>
      <div className={orderElement.filling}>
        {/* выводим кол-во ингредиентов если их более 1 в бургере */}
        {
          burger.filter(card => card.type != 'bun').map((check, index) => (check.id === item.id &&
            <p key={index} className={`${orderElement.count} text text_type_digits-default`}>{count[item.id] > 1 ? '+' + (count[item.id]) : ''}</p>
          ))
        }
        {/* отрисовываем ингредиент бургера */}
        <img className={orderElement.image} src={item.image} ></img>
        {/* создаем затемнение если ингредиентов более 1 штуки */}
        {
          burger.filter(card => card.type != 'bun').map((check, index) => (check.id === item.id && count[item.id] > 1 ?
            <div key={index + 100} className={orderElement.imageFilter}></div> : ''
          ))
        }
      </div>
    </li>
  )
}

export default OrderElement;
