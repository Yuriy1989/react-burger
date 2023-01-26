
import React, { FC, useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import orders from './orders.module.css';
import MenuProfile from '../components/menuProfile/MenuProfile';
import CardOrder from '../components/cardOrder/CardOrder';
import { getCookie } from '../utils/cookie';
import Loader from '../components/loader/Loader';
import { useAppDispatch as useDispatch, useAppSelector as useSelector} from '../services/store/hooks';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../services/constants';

const Orders: FC = () => {

  const feedRequest = useSelector(state => state.orders.feedRequest);
  const feedFailed = useSelector(state => state.orders.feedFailed);
  const accessToken: string | undefined= getCookie('accessToken');
  const wsUrl: string = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
  const data = useSelector(state => state.orders.data);
  let reverseData = data[0] ? Array.from(data[0]?.orders).reverse() : []; //реверс заказов пользователя
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsUrl,
    }
    );
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
          <div className={orders.ordersList}>
            <ul className={orders.cardOrder}>
              {
                reverseData.map(item => (
                  <CardOrder key={item._id} card={item} />
                ))
              }
            </ul>
          </div>
        </div>
      }
    </>
  )
}

export default Orders;
