
import React, { useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import orders from './orders.module.css';
import MenuProfile from '../components/menuProfile/MenuProfile';
import CardOrder from '../components/cardOrder/CardOrder';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/actionUserOrders';
import uuid from 'react-uuid';
import { getCookie } from '../utils/cookie';
import Loader from '../components/loader/Loader';

export function Orders () {

  const feedRequest = useSelector(state => state.orders.feedRequest);
  const feedFailed = useSelector(state => state.orders.feedFailed);
  const wsUrlUsers = 'wss://norma.nomoreparties.space/orders';
  const accessToken = getCookie('accessToken');
  const data = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        wsUrlUsers,
        accessToken
      }
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    }
  }, [])

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <Loader />}
      {!feedRequest && !feedFailed &&
        <div className={orders.orders}>
          <div className={orders.menuProfile}>
            <MenuProfile />
            <div className={`${orders.paragraf} text text_type_main-default text_color_inactive`}>
              <p >В этом разделе вы можете просмотреть свою историю заказов</p>
            </div>
          </div>
          <ul className={orders.cardOrder}>
            {
              data.map(item => (
                <CardOrder key={uuid()} item={item} />
              ))
            }

          </ul>
        </div>
      }
    </>
  )
}
