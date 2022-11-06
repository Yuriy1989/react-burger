
import React, { useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import orders from './orders.module.css';
import MenuProfile from '../components/menuProfile/MenuProfile';
import CardOrder from '../components/cardOrder/CardOrder';
import { getUserOrders } from '../services/actions/actionsOrders';

export function Orders () {

  const dispatch = useDispatch();
  const data = useSelector(state => state.orders.userOrders);

  console.log('data', data);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch])

  return (
    <>
      <div className={orders.orders}>
        <div className={orders.menuProfile}>
          <MenuProfile />
          <div className={`${orders.paragraf} text text_type_main-default text_color_inactive`}>
            <p >В этом разделе вы можете просмотреть свою историю заказов</p>
          </div>
        </div>
        <ul className={orders.cardOrder}>
          <CardOrder />
        </ul>
      </div>
    </>
  )
}
