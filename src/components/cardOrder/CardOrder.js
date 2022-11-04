import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cardOrder from './cardOrder.module.css';

export default function CardOrder () {

  let todayDate = new Date();
  let currentTimeZoneOffsetInHours  = todayDate.getTimezoneOffset() / 60;

  return (
    <>
      <li className={cardOrder.cardOrder}>
        <div className={cardOrder.numberOrder}>
          <h2 className={`${cardOrder.idOrder} text text_type_digits-default`}># 123456</h2>
          <p className={`text text_type_main-default text_color_inactive`}>Сегодня, {todayDate.getHours()}:{todayDate.getMinutes()} i-GMT{currentTimeZoneOffsetInHours}</p>
        </div>
        <p className={`${cardOrder.burgerName} text text_type_main-large `}>Death Star Starship Main бургер</p>
        <p className={`${cardOrder.statusOrder} text text_type_main-medium `}>Создан</p>
        <div className={cardOrder.ingredients}>
          <ul className={cardOrder.filling}>
            <li className={cardOrder.filling}>
              <img></img>
            </li>
          </ul>
          <div className={cardOrder.cellPrice}>
            <p className={`${cardOrder.cell} text text_type_digits-medium`}>100</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </>
  );
}
