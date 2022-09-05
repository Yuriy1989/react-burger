import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, getIngredientsForConstructor } from '../../services/actions/ingredients';

import app from './app.module.css';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';

export default function App() {
  const dispatch = useDispatch();

  //делаем запрос к серверу для получения всех ингредиентов
  useEffect(() => {
    dispatch(getIngredients());
  }, [])

  const selectedIngredients = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);

  useEffect(() => {
    dispatch(getIngredientsForConstructor(selectedIngredients));
  }, [selectedIngredients])

  const isOpenModal = useSelector(state => state.getInfoSelectedIngredient.openModal);
  const isOpenModalDetails = useSelector(state => state.getInfoSelectedIngredient.openModalOrder);

  const feedFailed = useSelector((state) => state.getIngredientsApi.feedFailed);
  const feedRequest = useSelector((state) => state.getIngredientsApi.feedRequest);

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {!feedFailed && !feedRequest &&
        <>
          <main className={app.app}>
            <div className={app.header}>
              <AppHeader />
            </div>
            <div className={app.section}>
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            </div>
          </main>
          {isOpenModalDetails &&
            <Modal
              title=""
            >
              <OrderDetails />
            </Modal>
          }
          {isOpenModal &&
            <Modal
              title="Детали ингредиента"
            >
              <IngredientDetails />
            </Modal>
          }
        </>
      }
    </>
  );
}
