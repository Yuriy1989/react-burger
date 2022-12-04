import React, { useEffect } from 'react';
import style, { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetails from './orderDetails.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../services/actions/getOrderDetails';


export default function OrderDetails() {

  const selectedId = useSelector(state => state.getOrderDetails.selectedIdIgredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(selectedId));
  }, [])

  const feedFailed = useSelector((state) => state.getOrderDetails.feedFailed);
  const feedRequest = useSelector((state) => state.getOrderDetails.feedRequest);
  const order = useSelector(state => state.getOrderDetails.infoOderDetails);

  return (
    <>
      {feedFailed && <p className={` ${orderDetails.numberOrder} text text_type_main-medium`}>Произошла ошибка получения заказа</p>}
      {feedRequest && <p className={` ${orderDetails.numberOrder} text text_type_main-medium`}>Формирование заказа...</p>}
      {!feedFailed && !feedRequest &&
        <>
          <p className={` ${orderDetails.numberOrder} text text_type_digits-large `}>{order.number}</p>
          <p className={` ${orderDetails.textIdOrder} text text_type_main-medium `}>идентификатор заказа</p>
          <div className={orderDetails.loadImage}></div>
          <div className={orderDetails.checkImage}><CheckMarkIcon type="primary" /></div>
          <p className={` ${orderDetails.statusOrder} text text_type_main-default `}>Ваш заказ начали готовить</p>
          <p className={` ${orderDetails.status} text text_type_main-default text_color_inactive `}>Дождитесь готовности на орбитальной станции</p>
        </>
      }
    </>
  )
}
