import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, getIngredientsForConstructor } from '../../services/actions/ingredients';

import app from './app.module.css';
// import { api } from '../../utils/Api';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
// import { BurgerContext, IngredientsContext } from '../../services/appContext';

export default function App() {

  // Булевый стейт для открытия модалки "Счет на оплату"
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  // Булевый стейт для открытия модалки "Информация об ингредиенте"
  // const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);
  // Стейт для открытия модалки с информацией об открытом ингредиенте
  // const [selectedIngredient, setselectedIngredient] = useState({});
  // Стейт для передачи данных в компоненты для отрисовки всех ингредиентов
  // const [ingredients, setIngredients] = useState([]);
  // Стейт для передачи данных в компоненты для отрисовки выбранных булочек
  const [selectedBun, setSelectedBun] = useState({});
  // Стейт для передачи данных в компоненты для отрисовки выбранной начинки
  const [selectedFilling, setSelectedFilling] = useState([]);
  // Стейт для передаче модалке номер ордера
  const [order, setOrdert] = useState();
  // Стейт для передачи _id на сервер для формирования заказа
  const [selectedId, setSelectedId] = useState([]);

  // Закрытие модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  // Открытие модалки "Счет на оплату"
  const handleOrderDetailsOpenModal = () => {
    setOrderDetails(selectedId);
    setIsOrderDetailsOpened(true);
  };

  // Открытие модалки "Информация об ингредиенте"
  const handleIngredientDetailsOpenModal = (item) => {
    setIsIngredientDetailsOpened(true);
    setselectedIngredient(item);
  };

  // Отправка данных на сервер для получения номера заказа
  const setOrderDetails = (data) => {
    api.setOrderDetails(data)
      .then(res => {
        setOrdert(res.order.number)
      })
      .catch(console.log);
  }

  // Хук получение данных с сервера только один раз при рендере страницы
  // useEffect(() => {
  //   getIngredients();
  // }, []);

  // Фильтруем по булке
  // const selectBun = () => {
  //   const bun = ingredients.find(item => item.type == 'bun');
  //   setSelectedBun(bun);
  // }

  // // Фильтруем по начинке
  // const selectIngredients = () => {
  //   const filling = ingredients.filter(item => item.type == 'main');
  //   setSelectedFilling(filling);
  // }

  // useEffect(() => {
  //   selectBun();
  //   selectIngredients();
  // }, [ingredients]);

  //создание функции диспатч
  const dispatch = useDispatch();

  //делаем запрос к серверу
  useEffect(() => {
    dispatch(getIngredients());
  }, [])

  const selectedIngredients = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);

  useEffect(() => {
    dispatch(getIngredientsForConstructor(selectedIngredients));
  }, [selectedIngredients])

  const selectedIngredientForConstructor = useSelector(state => state.getIngredientsApi.ingredientForConstructor)
  const isOpenModal = useSelector(state => state.getInfoSelectedIngredient.openModal);

  return (
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
      {isOpenModal &&
        <Modal
          title=""
        // onClose={closeAllModals}
        >
          <OrderDetails order={order} />
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
  );
}
