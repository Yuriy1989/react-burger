import { useState, useCallback, useEffect, useMemo } from 'react';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import feedId from './feedId.module.css';
import uuid from 'react-uuid';
import { timeCreateBurger } from '../utils/time';
import { getOrderUserDetails } from '../services/actions/getOrderDetails';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/actionUserOrders';

export function FeedId() {
  const { id } = useParams(); //id бургера
  const dispatch = useDispatch();
  // const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
  // const card = useSelector(state => state.orders.orders); //последние 50 заказов
  const card = useSelector(state => state.getOrderDetails.orderDetails);
  console.log('card', card);
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi); //все возможные ингредиенты
  const [cellOrder, setCellOrder] = useState(0); //цена за бургер
  const [data, setData] = useState([]); //название, номер и цена бургера
  const [burger, setBurger] = useState([]); //готовый бургер с фильтром по уникальным ингредиентам
  const [count, setCount] = useState({}); //объект типа {ID:количество} в массиве countData
  const [createTimeBurger, setCreateTimeBurger] = useState(); //время создания бургера
  const [cardData, setCardData] = useState({});


  const arr = useMemo(() => {
    return card;
  }, []);



  //сбор данных об ингредиентах бургера в заказе
  const createBurger = () => {
    const itemBurger = card?.orders[0];
    setData(itemBurger);

    let summa = 0; //цена за бургер
    let arrImage = [];
    let igredientsDetails = []; //ингредиенты с подробной информацией
    let n = 0;
    //собираем из бургера всю подбробную информацию по каждому ингредиенту
    while (n <= itemBurger?.ingredients?.length) {
      ingredientsData.map(item => {
        if (item?.id === itemBurger?.ingredients[n]) {
          summa += item?.price;
          arrImage.push(item?.image_mobile);
          igredientsDetails.push(item);
        }
      })
      n++;
      setCellOrder(summa); //передаем цену за бургер в state
    }

    let result = {};
    for (let i = 0; i < igredientsDetails?.length; ++i) {
      let a = igredientsDetails[i]?.id;
      if (result[a] != undefined) {
        ++result[a];
      }
      else
        result[a] = 1;
    }
    setCount(result);

    const nSet = new Set(igredientsDetails); //создаем конструктор
    const uniqueMas = Array.from(nSet); //создаем массим уникальный значений из конструктора
    const bun = uniqueMas.filter(item => item.type == 'bun'); //находим булочку
    const createBurger = [...uniqueMas, ...bun]; //добавляем булку в конец массива

    setBurger(createBurger); //передаем ингредиенты с подробной информацией в state

    //расчет времени создания бургера
    setCreateTimeBurger(timeCreateBurger(itemBurger?.createdAt));
  }

  // console.log('card', card?.orders);
  // if(card?.orders) {
  //   // createBurger();
  // }

  const test = () =>  dispatch(getOrderUserDetails(id));

  // useEffect(() => {
  //   dispatch(getOrderUserDetails(id));
  //   //
  // }, [])

  useEffect(() => {
    console.log('useState card===', cardData);
    setCardData(card);
  }, [arr])

  useEffect(() => {
    // createBurger();
    // console.log('useState card===', cardData);
    // setCardData(card);
  }, [card, arr, dispatch])

  return (
    <div className={feedId.feedId}>
      <h2 className={` ${feedId.idOrder} text text_type_digits-default `}># {data?.number}</h2>
      <p className={` ${feedId.name} text text_type_main-medium `}>{data?.name}</p>
      <p className={` ${feedId.status} text text_type_main-default `}>{(data?.status === 'done') ? 'Выполнен' : 'В работе'}</p>
      <p className={` ${feedId.ingredients} text text_type_main-medium `}>Состав:</p>
      <ul className={` ${feedId.ingredient} `}>
        {burger?.map(item => {
          return (
            <li key={uuid()} className={` ${feedId.items} mb-5`}>
              <div className={feedId.nameIngredient}>
                <div className={` ${feedId.borderImage} `}>
                  <img className={feedId.image} src={item?.image_mobile} alt={item?.image_mobile} ></img>
                </div>
                <p className='text text_type_main-default mr-4 ml-4'>{item.name}</p>
              </div>
              <div className={` ${feedId.item} `}>
                <p className={`text text_type_digits-default`}>{(count[item.id] > 1 && item.type != 'bun') ? (count[item.id]) : '1'}</p>
                <p className='text text_type_digits-default mr-2'>&nbsp;x</p>
                <p className='text text_type_digits-default mr-2'>{`${item.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )
        })}
      </ul>
      <div className={feedId.cellPrice}>
        <p className={`text text_type_main-default text_color_inactive`}>{createTimeBurger}</p>
        <div className={feedId.cell}>
          <p className={`text text_type_digits-default mr-2`}>{cellOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
