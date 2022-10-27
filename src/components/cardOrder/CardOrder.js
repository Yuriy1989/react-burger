import { useCallback } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import cardOrder from './cardOrder.module.css';

export default function CardOrder () {

  return (
    <>
      <li className={cardOrder.numberOrder}>
        <div>
          <h2 className={cardOrder.idOrder}></h2>
          <p>сегодня</p>
        </div>
        <p className={cardOrder.burgerName}></p>
        <p className={cardOrder.statusOrder}></p>
        <div className={cardOrder.ingredients}>
          <ul className={cardOrder.filling}>
            <li>
              <img></img>
            </li>
          </ul>
          <div className={cardOrder.cellPrice}>
            <p>100</p>
          </div>
        </div>
      </li>
    </>
  );
}
