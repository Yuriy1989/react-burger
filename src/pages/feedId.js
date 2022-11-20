import { useState, useCallback, useEffect } from 'react';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import feedId from './feedId.module.css';
import uuid from 'react-uuid';

export function FeedId () {

  let todayDate = new Date();
  let currentTimeZoneOffsetInHours  = todayDate.getTimezoneOffset() / 60;

  const { id }  = useParams(); //id бургера
  const card = useSelector(state => state.orders.orders); //последние 50 заказов
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi); //все возможные ингредиенты
  const [cellOrder, setCellOrder] = useState(0); //цена за бургер
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [burger, setBurger] = useState([]); //готовый бургер
  const [count, setCount] = useState({}); //объект типа {ID:количество} в массиве countData

  console.log('ingredientsData', ingredientsData);
  console.log('card', card);
  console.log('id', id);
  console.log('filterData', filterData);
  console.log('count', count);

  //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки

  //сбор данных об ингредиентах бургера в заказе
  const createBurger = () => {
    const itemBurger = card[0]?.orders.find(item => item._id === id); //ищем из последних 50 заказов наш по id
    setData(itemBurger);

    let summa = 0; //цена за бургер
    let arrImage = [];
    let igredientsDetails = []; //ингредиенты с подробной информацией
    let n = 0;
    //собираем из бургера всю подбробную информацию по каждому ингредиенту
    while (n <= itemBurger?.ingredients.length) {
      ingredientsData.map(item => {
        if (item.id === itemBurger.ingredients[n]) {
          summa += item.price;
          arrImage.push(item.image_mobile);
          igredientsDetails.push(item);
        }
      })
      n++;
      setCellOrder(summa); //передаем цену за бургер в state
      setFilterData(igredientsDetails);
    }

    let result = {};
    for (let i = 0; i < igredientsDetails.length; ++i) {
      let a = igredientsDetails[i].id;
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
  }

  useEffect(() => {
    createBurger();
  }, [])

  return (
    <div className={feedId.feedId}>
      <h2 className={` ${feedId.idOrder} text text_type_digits-default `}># {data?.number}</h2>
      <p className={` ${feedId.name} text text_type_main-medium `}>{data?.name}</p>
      <p className={` ${feedId.status} text text_type_main-default `}>{data?.status}</p>
      <p className={` ${feedId.ingredients} text text_type_main-medium `}>Состав:</p>
      <ul className={` ${feedId.ingredient} `}>
        {burger.map(item => (
          <li key={uuid()} className={` ${feedId.items} mb-5`}>
            <div className={feedId.nameIngredient}>
              <div className={` ${feedId.borderImage} `}>
                <img className={feedId.image} src={item?.image_mobile} alt={item?.image_mobile} ></img>
              </div>
              <p className='text text_type_main-default mr-4 ml-4'>{item.name}</p>
            </div>
            <div className={` ${feedId.item} `}>
              <p className={`text text_type_digits-default`}>{count[item.id] > 1 ? (count[item.id]) : '1'}</p>
              <p className='text text_type_digits-default mr-2'>&nbsp;x</p>
              <p className='text text_type_digits-default mr-2'>{`${item.price}`}</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={feedId.cellPrice}>
          <p className={`text text_type_main-default text_color_inactive`}>Сегодня, {todayDate.getHours()}:{todayDate.getMinutes()} i-GMT{currentTimeZoneOffsetInHours}</p>
          <div className={feedId.cell}>
            <p className={`text text_type_digits-default mr-2`}>{cellOrder}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
    </div>
  )
}
