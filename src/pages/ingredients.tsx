import {FC, useState, useCallback, useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import ingredients from './ingredients.module.css';
import { useAppSelector as useSelector} from '../services/store/hooks';
import { IData } from '../services/types';

const Ingredients: FC = () => {
  const { id }  = useParams<{id?: string}>();
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);
  const [data, setData] = useState<IData>();
  //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки
  const selectedIngredients = useCallback(
    () => {
      setData(ingredientsData.find(item => item.id === id));
    }, [ingredientsData]
  )

  useEffect(() => {
    selectedIngredients();
  }, [ingredientsData, id])

  return (
    <div className={ingredients.ingredients}>
      <h2 className='text text_type_main-medium'>Детали ингредиента</h2>
      <img className={ingredients.image} src={data?.image_large} alt={data?.name}></img>
      <p className={` ${ingredients.name } text text_type_main-medium `}>{data?.name}</p>
        <ul className={ingredients.items}>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data?.calories}</p>
          </li>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data?.proteins}</p>
          </li>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data?.fat}</p>
          </li>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data?.carbohydrates}</p>
          </li>
        </ul>
    </div>
  )
}

export default Ingredients;
