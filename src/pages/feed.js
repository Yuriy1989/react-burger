
import style from '@ya.praktikum/react-developer-burger-ui-components';
import feed from './feed.module.css';

export function Feed () {
  return (
    <section className={feed.feed}>
      <h2 className={ `${feed.title} text text_type_main-large`}>Лента заказов</h2>
      <div className={feed.orders}>
        <ul className={feed.cards}>
          <li className={feed.card}>

          </li>
        </ul>
      </div>
    </section>
  )
}
