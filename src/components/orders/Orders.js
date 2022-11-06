
import { useSelector } from 'react-redux';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orders from './orders.module.css';
import { useEffect, useState } from 'react';
import OrderElement from '../orderElement/OrderElement';
import uuid from 'react-uuid';

export default function Orders ( {card} ) {

  const [cellOrder, setCellOrder] = useState(0);
  const [countData, setCountData] = useState([]);
  const ingredientsData = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);

  //Фильтруем массив ингредиентов в заказе по уникальным значениям
  const foo = (arr) => {
    let map = new Map();
    for (let elem of arr) {
        let counter = map.get(elem);
        map.set(elem, counter ? counter + 1 : 1);
    }
    let res = [];
    for (let [elem, counter] of map.entries())
        if (counter >= 1)
            res.push(elem);
    return (res);
  }

  //сбор данных об ингредиенте в заказе
  const calcCell = () => {
    let summa = 0;
    let arrImage = [];
    let igredientsData = [];
    let n = 0;
    while (n <= card.ingredients.length) {
      ingredientsData.map(item => {
        if (item.id === card.ingredients[n]) {
          summa += item.price;
          arrImage.push(item.image_mobile);
          igredientsData.push(item);
        }
      })
      n++;
      setCellOrder(summa);
      setCountData(igredientsData);
    }
  }

  useEffect(() => {
    calcCell();
  }, [ingredientsData])

  return (
    <li className={orders.orders}>
        <div className={orders.numberOrder}>
          <h2 className={` ${orders.idOrder} text text_type_digits-default `}># {card.number}</h2>
          <p className={` text text_type_main-default text_color_inactive `}>{card.createdAt}</p>
        </div>
        <p className={` ${orders.burgerName} text text_type_main-medium `}>{card.name}</p>
        <div className={orders.ingredients}>
          <ul className={orders.fillings}>
            {
              foo(countData).map(item => (
                <OrderElement item={item} countData={countData} key={uuid()} />
              ))
            }
          </ul>
          <div className={orders.cellPrice}>
            <p className={`${orders.cell} text text_type_digits-medium mr-2`}>{cellOrder}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
  )
}
