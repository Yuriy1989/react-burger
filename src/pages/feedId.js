import { useState, useCallback, useEffect } from 'react';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import feedId from './feedId.module.css';
import uuid from 'react-uuid';

export function FeedId () {

  let todayDate = new Date();
  let currentTimeZoneOffsetInHours  = todayDate.getTimezoneOffset() / 60;

  const { id }  = useParams();
  const card = useSelector(state => state.orders.orders);
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);
  const [cellOrder, setCellOrder] = useState(0);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  console.log('ingredientsData', ingredientsData);
  console.log('card', card);
  console.log('id', id);
  console.log('filterData', filterData);

   //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки
  const selectedCard = useCallback(
    () => {
      setData(card[0]?.orders.find(item => item._id === id));
      calcCell();
    }, [card]
  )

  //сбор данных об ингредиенте в заказе
  const calcCell = () => {
    let summa = 0;
    let arrImage = [];
    let igredientsData = [];
    let n = 0;
    setData(card[0]?.orders.find(item => item._id === id));
    const datax = card[0]?.orders.find(item => item._id === id);
    console.log('calcCell data', data);

    while (n <= datax?.ingredients?.length) {
      ingredientsData.map(item => {
        if (item.id === datax.ingredients[n]) {
          summa += item.price;
          arrImage.push(item.image_mobile);
          igredientsData.push(item);
        }
      })
      n++;
      setCellOrder(summa);
      setFilterData(igredientsData);
    }
  }

  useEffect(() => {
    selectedCard();
    // calcCell();
  }, [])

  return (
    <div className={feedId.feedId}>
      <h2 className={` ${feedId.idOrder} text text_type_digits-default `}># {data?.number}</h2>
      <p className={` ${feedId.name} text text_type_main-medium `}>{data?.name}</p>
      <p className={` ${feedId.status} text text_type_main-default `}>{data?.status}</p>
      <p className={` ${feedId.ingredients} text text_type_main-medium `}>Состав:</p>
      <ul className={` ${feedId.ingredient} `}>
        <li className={` ${feedId.items} `}>
          {filterData.map(item => (
            <>
              <img key={uuid()} className={feedId.image} src={filterData?.image_mobile} alt={filterData?.image_mobile} ></img>
              {/* <p className='text text_type_main-default' key={uuid()}>{item}</p> */}
            </>
          ))}
          <div className={` ${feedId.item} `}>
            <p className='text text_type_digits-default'>2 x</p>
            <p className='text text_type_digits-default mr-2'>20</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      </ul>
      <div className={feedId.cellPrice}>
          <p className={`text text_type_main-default text_color_inactive`}>Сегодня, {todayDate.getHours()}:{todayDate.getMinutes()} i-GMT{currentTimeZoneOffsetInHours}</p>
          <div className={feedId.cell}>
            <p className={`text text_type_digits-default mr-2`}>510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
    </div>
  )
}
