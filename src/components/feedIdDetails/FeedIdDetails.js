import { useState, useCallback, useEffect } from 'react';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import feedIdDetails from './feedIdDetails.module.css';

export default function FeedIdDetails () {

  let todayDate = new Date();
  let currentTimeZoneOffsetInHours  = todayDate.getTimezoneOffset() / 60;

  // const { id }  = useParams();
  // const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);
  // const [data, setData] = useState({});

  //  //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки
  // const selectedIngredients = useCallback(
  //   () => {
  //     setData(ingredientsData.find(item => item.id === id));
  //   }, [ingredientsData]
  // )

  // useEffect(() => {
  //   selectedIngredients();
  // }, [])

  return (
    <div className={feedId.feedId}>
      <h2 className={` ${feedId.idOrder} text text_type_digits-default `}># 123456</h2>
      <p className={` ${feedId.name} text text_type_main-medium `}>Black Hole Singularity острый бургер</p>
      <p className={` ${feedId.status} text text_type_main-default `}>Выполнено</p>
      <p className={` ${feedId.ingredients} text text_type_main-medium `}>Состав:</p>
      <ul className={` ${feedId.ingredient} `}>
        <li className={` ${feedId.items} `}>
          <img className={feedId.image} src='sdfsdg' alt='sdfsdg'></img>
          <p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
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
