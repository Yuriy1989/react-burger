import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cardOrder from './cardOrder.module.css';
import { timeCreateBurger } from '../../utils/time';
import OrderElement from '../orderElement/OrderElement';

export default function CardOrder({ card }) {

  const [cellOrder, setCellOrder] = useState(0); //цена за бургер
  const [countData, setCountData] = useState([]);
  const [burger, setBurger] = useState([]); //готовый бургер
  const location = useLocation();
  const ingredientsData = useSelector((state) => state.getIngredientsApi.ingredientsGetApi); //все ингредиенты
  const [createTimeBurger, setCreateTimeBurger] = useState(); //время создания бургера

  //сбор данных об ингредиентах бургера в заказе
  const createBurger = () => {
    let summa = 0; //цена за бургер
    let arrImage = [];
    let igredientsDetails = []; //ингредиенты с подробной информацией
    let n = 0;
    //собираем из бургера всю подбробную информацию по каждому ингредиенту
    while (n <= card?.ingredients?.length) {
      ingredientsData.map(item => {
        if (item.id === card.ingredients[n]) {
          summa += item.price;
          arrImage.push(item.image_mobile);
          igredientsDetails.push(item);
        }
      })
      n++;
      setCellOrder(summa); //передаем цену за бургер в state
      setCountData(igredientsDetails);
    }

    const nSet = new Set(igredientsDetails); //создаем конструктор
    const uniqueMas = Array.from(nSet); //создаем массим уникальный значений из конструктора
    const bun = uniqueMas.filter(item => item.type == 'bun'); //находим булочку
    const createBurger = [...uniqueMas, ...bun]; //добавляем булку в конец массива

    setBurger(createBurger); //передаем ингредиенты с подробной информацией в state
    setCreateTimeBurger(timeCreateBurger(card.createdAt));//расчет времени создания бургера
  }

  useEffect(() => {
    createBurger();
  }, [ingredientsData])


  return (
    <>
      {!card && <h2 className={`text text_type_main-large`}>У вас нет заказов</h2>}
      {card &&
        <Link className={cardOrder.link}
          to={{
            pathname: `/profile/orders/${card.number}`,
            state: { isOpenModalOrder: location }
          }}
        >
          <li className={` ${cardOrder.cardOrder} mb-6`}>
            <div className={cardOrder.numberOrder}>
              <h2 className={` ${cardOrder.idOrder} text text_type_digits-default `}># {card.number}</h2>
              <p className={` text text_type_main-default text_color_inactive `}>{createTimeBurger}</p>
            </div>
            <p className={` ${cardOrder.burgerName} text text_type_main-large `}>{card.name}</p>
            <p className={` ${cardOrder.statusOrder} text text_type_main-medium mt-2 ml-6 mb-6`}>{card.status === 'done' && 'Готов'}</p>
            <div className={` ${cardOrder.ingredients} pb-6`}>
              <ul className={cardOrder.fillings}>
                {
                  burger.map((item, index) => (
                    <OrderElement indexStyle={burger.length - index} burger={burger} item={item} countData={countData} key={uuid()} />
                  ))
                }
              </ul>
              <div className={cardOrder.cellPrice}>
                <p className={`${cardOrder.cell} text text_type_digits-medium mr-2`}>{cellOrder}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        </Link>
      }
    </>
  );
}
