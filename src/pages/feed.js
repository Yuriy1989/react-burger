import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import Orders from '../components/orders/Orders';
import Stats from '../components/stats/Stats';
import feed from './feed.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/actionUserOrders';

export function Feed() {

  const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
  const dispatch = useDispatch();
  const data = useSelector(state => state.orders.orders);

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

  const feedRequest = useSelector(state => state.orders.feedRequest);
  const feedFailed = useSelector(state => state.orders.feedFailed);

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {!feedRequest && !feedFailed &&
        <>
          <div className={feed.header}>
            <h2 className={`${feed.title} text text_type_main-large`}>Лента заказов</h2>
          </div>
          <section className={feed.feed}>
            <div className={feed.orders}>
              <ul className={feed.cards}>
                {
                  data[0]?.orders?.map(card => (
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
