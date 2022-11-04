
import style from '@ya.praktikum/react-developer-burger-ui-components';
import Orders from '../components/orders/Orders';
import Stats from '../components/stats/Stats';
import feed from './feed.module.css';

export function Feed() {
  return (
    <>
      <div className={feed.header}>
        <h2 className={`${feed.title} text text_type_main-large`}>Лента заказов</h2>
      </div>
      <section className={feed.feed}>
        <div className={feed.orders}>
          <ul className={feed.cards}>
            <Orders />
          </ul>
        </div>
        <Stats />
      </section>
    </>
  )
}
