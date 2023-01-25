import React, { FC, useState, useCallback, useEffect } from 'react';
import ingredientDetails from './ingredientDetails.module.css';
import { useParams } from 'react-router-dom';
import { openInfoSelectedInrgedient } from '../../services/actions/getIngredientforOpenModal';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../../services/store/hooks';
import { IData } from '../../services/types';

interface ID {
  calories: number,
  carbohydrates: number,
  fat: number,
  id: string,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
}

const IngredientDetails: FC = () => {
  const { id }  = useParams<{id?: string}>();
  const ingredientData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);

  const [ingredient, setIngredient] = useState<ID>({});
  console.log('ingredient', ingredient);
  const dispatch = useDispatch();

  //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки
  const selectedIngredients = useCallback(
    () => {
      // if(!ingredientData) return;
      const t = ingredientData.find(item => item.id === id)
      if(!t) return;
      setIngredient(t);
    }, [ingredientData, id, dispatch]
  )

  useEffect(() => {
    selectedIngredients();
    dispatch(openInfoSelectedInrgedient(ingredient));
  }, [ingredientData, id])

  return (
    <>
      <img className={ingredientDetails.image} src={ingredient?.image_large} alt={ingredient?.name}></img>
      <p className={` ${ingredientDetails.name } text text_type_main-medium`}>{ingredient?.name}</p>
        <ul className={ingredientDetails.items}>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient?.calories}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient?.proteins}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient?.fat}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient?.carbohydrates}</p>
          </li>
        </ul>
    </>
  )
}

export default IngredientDetails;
