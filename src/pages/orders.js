
import React, { useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import orders from './orders.module.css';
import MenuProfile from '../components/menuProfile/MenuProfile';
import CardOrder from '../components/cardOrder/CardOrder';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/actionUserOrders';

export function Orders () {

  const wsUrl = 'wss://norma.nomoreparties.space/orders';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        wsUrl
      }
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    }
  }, [])

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
