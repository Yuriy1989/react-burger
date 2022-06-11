import React, {useState, useEffect} from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import app from './app.module.css';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import Modal from '../modal/Modal';
// import {data} from '../../utils/data.js';

export default function App() {

  // Булевый стейт для открытия модалки "Счет на оплату"
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);

  // Булевый стейт для открытия модалки "Информация об ингредиенте"
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  // Закрытие модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  // Открытие модалки "Счет на оплату"
  const handleOrderDetailsOpenModal = () => {
    setIsOrderDetailsOpened(true);
  };

  const [selectedIngredient, setselectedIngredient] = useState({});

  // Открытие модалки "Информация об ингредиенте"
  const handleIngredientDetailsOpenModal = (item) => {
    setIsIngredientDetailsOpened(true);
    setselectedIngredient(item);
  };

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  let [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    fetch(` ${url} `)
    .then(res => {
      return res.json()
    })
    .then(data => setIngredients(data.data))
    .catch(console.log);
  }

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <>
      <main className={app.app}>
        <div className={app.header}>
          <AppHeader />
        </div>
        <div className={app.section}>
          <BurgerIngredients data={ingredients} onOpenModal={handleIngredientDetailsOpenModal}/>
          <BurgerConstructor data={ingredients} onOpenModal={handleOrderDetailsOpenModal}/>
        </div>
      </main>

      {isOrderDetailsOpened &&
        <Modal
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails onOverlayClick={closeAllModals}/>
        </Modal>
      }

      {isIngredientDetailsOpened &&
        <Modal
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          ingredient={selectedIngredient}
        >
          <IngredientDetails onOverlayClick={closeAllModals} />
        </Modal>
      }
    </>
  );
}
