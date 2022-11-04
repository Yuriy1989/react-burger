import { useState, useCallback, useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import feedId from './feedId.module.css';

export function FeedId () {

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
      <h2 className='text text_type_main-medium'>Детали ингредиента</h2>
      <img className={feedId.image} src='sdfsdg' alt='sdfsdg'></img>
      <p className={` ${feedId.name } text text_type_main-medium `}>sdfsdg</p>
        <ul className={feedId.items}>
          <li className={feedId.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${feedId.count } text text_type_digits-default text_color_inactive `}>123</p>
          </li>
          <li className={feedId.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${feedId.count } text text_type_digits-default text_color_inactive `}>123</p>
          </li>
          <li className={feedId.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${feedId.count } text text_type_digits-default text_color_inactive `}>123</p>
          </li>
          <li className={feedId.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${feedId.count } text text_type_digits-default text_color_inactive `}>123</p>
          </li>
        </ul>
    </div>
  )
}
