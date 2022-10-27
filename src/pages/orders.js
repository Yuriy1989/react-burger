
import style from '@ya.praktikum/react-developer-burger-ui-components';
import orders from './orders.module.css';

export function Orders () {
  return (
    <div className={orders.orders}>
      <h2 className='text text_type_main-medium'>История заказов</h2>
    </div>
  )
}
