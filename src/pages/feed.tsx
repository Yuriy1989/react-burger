import react, {FC, useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import Orders from '../components/orders/Orders';
import Stats from '../components/stats/Stats';
import feed from './feed.module.css';
import { connectionStart, connectionClose } from '../services/actions/actionUserOrders';
import Loader from '../components/loader/Loader';
import { useAppDispatch, useAppDispatch as useDispatch, useAppSelector } from '../services/store/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/constants';

const Feed: FC = () => {
  const feedRequest = useAppSelector(state => state.orders.feedRequest);
  const feedFailed = useAppSelector(state => state.orders.feedFailed);
  const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
  const data = useAppSelector(state => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsUrl
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
        <>
          <div className={feed.header}>
            <h2 className={`${feed.title} text text_type_main-large`}>Лента заказов</h2>
          </div>
          <section className={feed.feed}>
            <div className={feed.orders}>
              <ul className={feed.cards}>
                {
                  data[0]?.orders?.map((card: { _id: react.Key | null | undefined; })=> (
                    <Orders card={card} key={card._id} />
                  ))
                }
              </ul>
            </div>
            <Stats />
          </section>
        </>
      }
    </>
  )
}

export default Feed;
