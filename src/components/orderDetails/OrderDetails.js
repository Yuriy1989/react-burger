import React from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetails from './orderDetails.module.css';
import vector1 from '../../images/Vector_1.svg';
import vector2 from '../../images/Vector_2.svg';
import vector3 from '../../images/Vector_3.svg';

export default function OrderDetails() {
  return (
    <div className={orderDetails.modalContainer}>
      <div className={orderDetails.closeButton}>
        <CloseIcon type="primary" />
      </div>
      <p className={` ${orderDetails.numberOrder} text text_type_digits-large `}>034536</p>
      <p className={` ${orderDetails.textIdOrder} text text_type_main-medium `}>идентификатор заказа</p>
      <div className={orderDetails.loadImage}></div>
      <div className={orderDetails.checkImage}><CheckMarkIcon type="primary" /></div>
      <p className={` ${orderDetails.statusOrder} text text_type_main-default `}>Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
