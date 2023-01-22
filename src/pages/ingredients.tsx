import {FC, useState, useCallback, useEffect } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import ingredients from './ingredients.module.css';
import { useAppSelector as useSelector} from '../services/store/hooks';

interface IData {
  calories: number | undefined,
  carbohydrates: number | undefined,
  fat: number | undefined,
  id: string,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number | undefined,
  proteins: number | undefined,
  type: string,
}

const Ingredients: FC = () => {

  const { id }  = useParams<{id?: string}>();
  const ingredientsData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);
  console.log(ingredientsData);
  const [data, setData] = useState<IData>({
    calories: undefined,
    carbohydrates: undefined,
    fat: undefined,
    id: '',
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: undefined,
    proteins: undefined,
    type: '',
  });

     //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки
  const selectedIngredients = useCallback(
    () => {
      const t = ingredientsData.find(item => item.id === id);
      console.log('t', t);
      setData(ingredientsData.find(item => item.id === id));
    }, [ingredientsData]
  )

  useEffect(() => {
    selectedIngredients();
  }, [])

  return (
    <div className={ingredients.ingredients}>
      <h2 className='text text_type_main-medium'>Детали ингредиента</h2>
      <img className={ingredients.image} src={data.image_large} alt={data.name}></img>
      <p className={` ${ingredients.name } text text_type_main-medium `}>{data.name}</p>
        <ul className={ingredients.items}>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data.calories}</p>
          </li>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data.proteins}</p>
          </li>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data.fat}</p>
          </li>
          <li className={ingredients.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${ingredients.count } text text_type_digits-default text_color_inactive `}>{data.carbohydrates}</p>
          </li>
        </ul>
    </div>
  )
}

export default Ingredients;
