import { FC, useState, useEffect } from 'react';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import feedId from './feedId.module.css';
import { timeCreateBurger } from '../utils/time';
import { getOrderUserDetails } from '../services/actions/getOrderDetails';
import { useAppDispatch as useDispatch, useAppSelector as useSelector}  from '../services/store/hooks';
import { ICard, ICardData, ICount, IData } from '../services/types';

const FeedId: FC = () => {
  const { id } = useParams<{id?: string}>(); //id бургера
  const dispatch = useDispatch();
  const card = useSelector(state => state.getOrderDetails.orderDetails);
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi); //все возможные ингредиенты
  const [cellOrder, setCellOrder] = useState<number>(0); //цена за бургер
  const [data, setData] = useState<Array<ICard>>([]); //название, номер и цена бургера
  const [burger, setBurger] = useState<Array<IData>>([]); //готовый бургер с фильтром по уникальным ингредиентам
  const [count, setCount] = useState<ICount>({}); //объект типа {ID:количество} в массиве countData
  const [createTimeBurger, setCreateTimeBurger] = useState<string>(); //время создания бургера
  const [cardData, setCardData] = useState<Array<ICardData>>([]); //информация о заказе

  //сбор данных об ингредиентах бургера в заказе
  const createBurger = () => {
    if (cardData[0]?.success) {
      const itemBurger: ICard = card[0]?.orders[0];
      setData([itemBurger]);
      let summa: number = 0; //цена за бургер
      let arrImage: Array<string> = [];
      let ingredientsDetails: Array<IData> = []; //ингредиенты с подробной информацией
      let n: number = 0;
      //собираем из бургера всю подбробную информацию по каждому ингредиенту
      while (n <= itemBurger?.ingredients?.length) {
        ingredientsData.map(item => {
          if (item?.id === itemBurger?.ingredients[n]) {
            summa += item?.price;
            arrImage.push(item?.image_mobile);
            ingredientsDetails.push(item);
          }
        })
        n++;
        setCellOrder(summa); //передаем цену за бургер в state
      }

      let result: ICount = {};
      for (let i = 0; i < ingredientsDetails?.length; ++i) {
        let a = ingredientsDetails[i]?.id;
        if (result[a] != undefined) {
          ++result[a];
        }
        else
          result[a] = 1;
      }
      setCount(result);

      const nSet = new Set(ingredientsDetails); //создаем конструктор
      const createBurger = Array.from(nSet); //создаем массим уникальный значений из конструктора
      setBurger(createBurger); //передаем ингредиенты с подробной информацией в state

      //расчет времени создания бургера
      setCreateTimeBurger(timeCreateBurger(itemBurger?.createdAt));
    }
  }

  useEffect(() => {
    dispatch(getOrderUserDetails(id));
  }, [])

  useEffect(() => {
    setCardData(card);
    createBurger();
  }, [cardData, card])

  return (
    <div className={feedId.feedId}>
      <h2 className={` ${feedId.idOrder} text text_type_digits-default `}># {data[0]?.number}</h2>
      <p className={` ${feedId.name} text text_type_main-medium `}>{data[0]?.name}</p>
      <p className={` ${feedId.status} text text_type_main-default `}>{(data[0]?.status === 'done') ? 'Выполнен' : 'В работе'}</p>
      <p className={` ${feedId.ingredients} text text_type_main-medium `}>Состав:</p>
      <ul className={` ${feedId.ingredient} `}>
        {burger?.map((item, index) => {
          return (
            <li key={index} className={` ${feedId.items} mb-5`}>
              <div className={feedId.nameIngredient}>
                <div className={` ${feedId.borderImage} `}>
                  <img className={feedId.image} src={item?.image_mobile} alt={item?.image_mobile} ></img>
                </div>
                <p className='text text_type_main-default mr-4 ml-4'>{item.name}</p>
              </div>
              <div className={` ${feedId.item} `}>
                <p className={`text text_type_digits-default`}>{(count[item.id] > 1) ? (count[item.id]) : '1'}</p>
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

export default FeedId;
