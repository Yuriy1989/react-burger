import React, { useState, useCallback, useEffect } from 'react';
import ingredientDetails from './ingredientDetails.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { openInfoSelectedInrgedient } from '../../services/actions/getIngredientforOpenModal';

export default function IngredientDetails() {

  const { id }  = useParams();
  const accessToken = getCookie('accessToken');
  const ingredientData = useSelector(state => state.getIngredientsApi.ingredientsGetApi);
  const [ingredient, setIngredient] = useState({});
  const dispatch = useDispatch();

  const selectedIngredients = useCallback(
    () => {
      setIngredient(ingredientData.find(item => item.id === id));
    }, [ingredientData]
  )

  if (!accessToken) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  useEffect(() => {
    selectedIngredients();
    dispatch(openInfoSelectedInrgedient(ingredient));
  }, [])

  return (
    <>
      <img className={ingredientDetails.image} src={ingredient.image_large} alt={ingredient.name}></img>
      <p className={` ${ingredientDetails.name } text text_type_main-medium `}>{ingredient.name}</p>
        <ul className={ingredientDetails.items}>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.calories}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.proteins}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.fat}</p>
          </li>
          <li className={ingredientDetails.item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className={` ${ingredientDetails.count } text text_type_digits-default text_color_inactive `}>{ingredient.carbohydrates}</p>
          </li>
        </ul>
    </>
  )
}
