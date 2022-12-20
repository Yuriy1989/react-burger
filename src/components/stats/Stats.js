import React from "react";
import style from '@ya.praktikum/react-developer-burger-ui-components';
import stats from './stats.module.css';
import { useSelector } from 'react-redux';

export default function Stats() {

  const data = useSelector(state => state.orders.orders);

  let n = 0; //счетчик всех заказов
  let y = 0; //счетчих текущего заказа
  let mass = []; //общий массив заказов разбитый на массив по 10 элементом
  while(n < data[0]?.orders?.length) {
    let x = 0; //внутренний счетчик
    let inMass = []; //массив заказов из 10 элементов
    while(x < 10) {
      inMass.push(data[0]?.orders[y]);
      x++;
      y++;
    }
    mass.push(inMass);
    n = n + x;
  }

  return (
    <section className={stats.stats} >
      <div className={stats.ordersStatus}>
        <div className={stats.statusOrders}>
          <h2 className={` ${stats.statusTitle} text text_type_main-medium `}>Готовы: </h2>
          <div className={` ${stats.numberOrder} `}>
            {mass.map((item, index) => (
              <ul key={index} className={stats.item}>
                {item.filter(card => card?.status === 'done').map((itemI, index) => (
                  <li key={index} className={` ${stats.idOrder} ${stats.idOrder_Green} text text_type_digits-default `}>
                    {itemI.number}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className={stats.statusOrders}>
          <h2 className={` ${stats.statusTitle} text text_type_main-medium `}>В работе: </h2>
          <ul className={stats.item}>
            {data[0]?.orders?.filter(card => card?.status != 'done').map(item => (
              <li key={item._id} className={` ${stats.idOrder} ${stats.idOrder_White} text text_type_digits-default `}>
                {item.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className={` ${stats.text} text text_type_main-medium `}>Выполнено за все время:</h3>
      <p className={` ${stats.numberOrder} text text_type_digits-large `}>{data[0]?.total}</p>
      <h3 className={` ${stats.text} text text_type_main-medium `}>Выполнено за сегодня:</h3>
      <p className={` ${stats.numberOrder} text text_type_digits-large `}>{data[0]?.totalToday}</p>
    </section>
  );
}
