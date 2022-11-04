import React from "react";
import style from '@ya.praktikum/react-developer-burger-ui-components';
import stats from './stats.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Stats() {

  const data = useSelector(state => state.orders.orders);

  return (
    <section className={stats.stats} >
      <div className={stats.ordersStatus}>
        <div className={stats.statusOrders}>
          <h2 className={` ${stats.statusTitle} text text_type_main-medium `}>Готовы: </h2>
          <ul className={stats.item}>
            <li className={` ${stats.idOrder} ${stats.idOrder_Green} text text_type_digits-default `}>
              123456
            </li>
          </ul>
        </div>
        <div className={stats.statusOrders}>
          <h2 className={` ${stats.statusTitle} text text_type_main-medium `}>В работе: </h2>
          <ul className={stats.item}>
            <li className={` ${stats.idOrder} ${stats.idOrder_White} text text_type_digits-default `}>
              654321
            </li>
          </ul>
        </div>
      </div>
      <h3 className={` ${stats.text} text text_type_main-medium `}>Выполнено за все время:</h3>
      <p className={` ${stats.numberOrder} text text_type_digits-large `}>{data?.total}</p>
      <h3 className={` ${stats.text} text text_type_main-medium `}>Выполнено за сегодня:</h3>
      <p className={` ${stats.numberOrder} text text_type_digits-large `}>{data?.totalToday}</p>
    </section>
  );
}
