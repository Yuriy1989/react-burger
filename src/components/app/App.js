import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, getIngredientsForConstructor } from '../../services/actions/ingredients';
import { GET_INGREDIENTS_API } from '../../services/reducers/ingredients';

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
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);
  // Стейт для открытия модалки с информацией об открытом ингредиенте
  const [selectedIngredient, setselectedIngredient] = useState({});
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

  // Получение данных с сервера
  // const getIngredients = () => {
  //   api.getIngridients()
  //     .then(res => {
  //       const ingredients = res.data.map((item) => {
  //         return {
  //           id: item._id,
  //           name: item.name,
  //           price: item.price,
  //           type: item.type,
  //           image: item.image,
  //           image_mobile: item.image_mobile,
  //           image_large: item.image_large,
  //           proteins: item.proteins,
  //           fat: item.fat,
  //           carbohydrates: item.carbohydrates,
  //           calories: item.calories
  //         }
  //       })
  //       setIngredients(ingredients)
  //     })
  //     .catch(console.log);
  // }

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

  const selectedIngredients = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);
  console.log("selectedIngredients", selectedIngredients);


  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  useEffect(() => {
    dispatch(getIngredientsForConstructor(selectedIngredients));
  }, [selectedIngredients])

  console.log("selectedIngredients length =", selectedIngredients.length);

  let length = selectedIngredients.length

  // const testtest = dispatch(GET_INGREDIENTS_API(data));



  return (
    <>
      <main className={app.app}>
        <div className={app.header}>
          <AppHeader />
        </div>
        <div className={app.section}>
          {/* <BurgerContext.Provider value={{ ingredients }} > */}
            <BurgerIngredients onOpenModal={handleIngredientDetailsOpenModal} />
          {/* </BurgerContext.Provider> */}
          {/* <IngredientsContext.Provider val> ue={{ selectedBun, selectedFilling, selectedId, setSelectedId }} > */}
            {(length > 0) &&
              <BurgerConstructor onOpenModal={handleOrderDetailsOpenModal} />
            }
          {/* </IngredientsContext.Provider> */}
        </div>
      </main>

      {isOrderDetailsOpened &&
        <Modal
          title=""
          onClose={closeAllModals}
        >
          <OrderDetails order={order} />
        </Modal>
      }
      {isIngredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onClose={closeAllModals}
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      }
    </>
  );
}
