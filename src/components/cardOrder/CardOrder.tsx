import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cardOrder from './cardOrder.module.css';
import { timeCreateBurger } from '../../utils/time';
import OrderElement from '../orderElement/OrderElement';
import { useAppSelector as useSelector} from '../../services/store/hooks';
import { ICard, IData } from '../../services/types';

const CardOrder: FC<{ card: ICard }> = ({ card }) => {
  const [cellOrder, setCellOrder] = useState<number>(0); //цена за бургер
  const [countData, setCountData] = useState<Array<IData>>([]);
  const [burger, setBurger] = useState<Array<IData>>([]); //готовый бургер
  const location = useLocation();
  const ingredientsData = useSelector((state) => state.getIngredientsApi.ingredientsGetApi); //все ингредиенты
  const [createTimeBurger, setCreateTimeBurger] = useState<string>(); //время создания бургера

  //сбор данных об ингредиентах бургера в заказе
  const createBurger = () => {
    let summa: number = 0; //цена за бургер
    let arrImage: Array<string> = [];
    let ingredientsDetails: Array<IData> = []; //ингредиенты с подробной информацией
    let n: number = 0;
    //собираем из бургера всю подбробную информацию по каждому ингредиенту
    while (n <= card?.ingredients?.length) {
      ingredientsData.map(item => {
        if (item.id === card.ingredients[n]) {
          summa += item.price;
          arrImage.push(item.image_mobile);
          ingredientsDetails.push(item);
        }
      })
      n++;
      setCellOrder(summa); //передаем цену за бургер в state
      setCountData(ingredientsDetails);
    }

    const nSet = new Set(ingredientsDetails); //создаем конструктор
    const uniqueMas = Array.from(nSet); //создаем массим уникальный значений из конструктора
    const bun = uniqueMas.filter(item => item.type == 'bun'); //находим булочку
    const createBurger = [...uniqueMas, ...bun]; //добавляем булку в конец массива
    setBurger(createBurger); //передаем ингредиенты с подробной информацией в state
    const time:string = timeCreateBurger(card.createdAt);
    setCreateTimeBurger(time);//расчет времени создания co
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
                    <OrderElement indexStyle={burger.length - index} burger={burger} item={item} countData={countData} key={index} />
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

export default CardOrder;
