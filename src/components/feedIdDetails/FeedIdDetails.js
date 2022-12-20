import { useState, useCallback, useEffect } from 'react';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import feedIdDetails from './feedIdDetails.module.css';
import { timeCreateBurger } from '../../utils/time';
import { openBurgerDetails } from '../../services/actions/getIngredientforOpenModal';

export default function FeedIdDetails () {

  const dispatch = useDispatch();
  const { id }  = useParams(); //id бургера
  const card = useSelector(state => state.orders.orders); //последние 50 заказов
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi); //все возможные ингредиенты
  const [cellOrder, setCellOrder] = useState(0); //цена за бургер
  const [data, setData] = useState([]); //название, номер и цена бургера
  const [burger, setBurger] = useState([]); //готовый бургер с фильтром по уникальным ингредиентам
  const [count, setCount] = useState({}); //объект типа {ID:количество} в массиве countData
  const [createTimeBurger, setCreateTimeBurger] = useState(); //время создания бургера

  //сбор данных об ингредиентах бургера в заказе
  const createBurger = useCallback(
    () => {
    const itemBurger = card[0]?.orders.find(item => item.number === Number(id)); //ищем из последних 50 заказов наш по id
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

    //расчет времени создания бургера
    setCreateTimeBurger(timeCreateBurger(itemBurger?.createdAt));
  }, [card]
  )

  useEffect(() => {
    createBurger();
    dispatch(openBurgerDetails());
  }, [])

  return (
    <>
      <div className={feedIdDetails.feedId}>
        <h2 className={` ${feedIdDetails.idOrder} text text_type_digits-default `}># {data?.number}</h2>
        <p className={` ${feedIdDetails.name} text text_type_main-medium `}>{data?.name}</p>
        <p className={` ${feedIdDetails.status} text text_type_main-default `}>{(data?.status === 'done') ? 'Выполнен' : 'В работе'}</p>
        <p className={` ${feedIdDetails.ingredients} text text_type_main-medium `}>Состав:</p>
        <ul className={` ${feedIdDetails.ingredient} `}>
          {burger.map((item, index) => (
            <li key={index} className={` ${feedIdDetails.items} mb-5`}>
              <div className={feedIdDetails.nameIngredient}>
                <div className={` ${feedIdDetails.borderImage} `}>
                  <img className={feedIdDetails.image} src={item?.image_mobile} alt={item?.image_mobile} ></img>
                </div>
                <p className='text text_type_main-default mr-4 ml-4'>{item.name}</p>
              </div>
              <div className={` ${feedIdDetails.item} `}>
                <p className={`text text_type_digits-default`}>{(count[item.id] > 1 && item.type != 'bun') ? (count[item.id]) : '1'}</p>
                <p className='text text_type_digits-default mr-2'>&nbsp;x</p>
                <p className='text text_type_digits-default mr-2'>{`${item.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
        <div className={feedIdDetails.cellPrice}>
            <p className={`text text_type_main-default text_color_inactive`}>{createTimeBurger}</p>
            <div className={feedIdDetails.cell}>
              <p className={`text text_type_digits-default mr-2`}>{cellOrder}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
      </div>
    </>
  )
}
