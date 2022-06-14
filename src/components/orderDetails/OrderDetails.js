import React from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetails from './orderDetails.module.css';

export default function OrderDetails({ onClose }) {
  return (
    <div className={orderDetails.modalContainer}>
      <div className={orderDetails.closeButton}>
        <CloseIcon type="primary" onClick={onClose}/>
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
