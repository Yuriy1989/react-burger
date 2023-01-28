import React, { FC, useState, useCallback, useEffect } from 'react';
import ingredientDetails from './ingredientDetails.module.css';
import { useParams } from 'react-router-dom';
import { openInfoSelectedInrgedient as openInfoSelectedIngredient } from '../../services/actions/getIngredientforOpenModal';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../../services/store/hooks';
import { IData } from '../../services/types';

const IngredientDetails: FC = () => {
  const { id }  = useParams<{id?: string}>();
  const ingredientData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);
  const [ingredient, setIngredient] = useState<Array<IData>>([]);
  const dispatch = useDispatch();

  //Ищем ингредиент из общего массива ингредиентов по определенному id из ссылки
  const selectedIngredients = useCallback(
    () => {
      const data = ingredientData.find(item => item.id === id)
      if (data) {
        setIngredient([data]);
      }
    }, [ingredientData, id, dispatch]
  )

  useEffect(() => {
    selectedIngredients();
    // dispatch(openInfoSelectedIngredient(ingredient));
  }, [ingredientData, id])

  return (
    <>
      <img className={ingredientDetails.image} src={ingredient[0]?.image_large} alt={ingredient[0]?.name}></img>
      <p className={` ${ingredientDetails.name } text text_type_main-medium`}>{ingredient[0]?.name}</p>
        <ul className={ingredientDetails.items}>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient[0]?.calories}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient[0]?.proteins}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient[0]?.fat}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient[0]?.carbohydrates}</p>
          </li>
        </ul>
    </>
  )
}

export default IngredientDetails;
