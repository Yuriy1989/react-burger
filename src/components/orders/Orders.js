
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orders from './orders.module.css';

export default function Orders () {

  let todayDate = new Date();
  let currentTimeZoneOffsetInHours  = todayDate.getTimezoneOffset() / 60;

  return (
    <li className={orders.orders}>
        <div className={orders.numberOrder}>
          <h2 className={` ${orders.idOrder} text text_type_digits-default `}># 123456</h2>
          <p className={` text text_type_main-default text_color_inactive `}>Сегодня, {todayDate.getHours()}:{todayDate.getMinutes()} i-GMT{currentTimeZoneOffsetInHours}</p>
        </div>
        <p className={` ${orders.burgerName} text text_type_main-medium `}>Death Star Starship Main бургер</p>
        <div className={orders.ingredients}>
          <ul className={orders.filling}>
            <li className={orders.filling}>
              <img></img>
            </li>
          </ul>
          <div className={orders.cellPrice}>
            <p className={`${orders.cell} text text_type_digits-medium`}>100</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
  )
}
