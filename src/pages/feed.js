
import style from '@ya.praktikum/react-developer-burger-ui-components';
import feed from './feed.module.css';

export function Feed () {
  return (
    <div className={feed.feed}>
      <h2 className='text text_type_main-medium'>Лента заказов</h2>
    </div>
  )
}
