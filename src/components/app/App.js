import React, {useState, useEffect} from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import app from './app.module.css';
import OrderDetails from '../orderDetails/OrderDetails';
import Modal from '../modal/Modal';
// import {data} from '../../utils/data.js';

export default function App() {

  // Булевый стейт для одной конкретной модалки
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);

  // Закрытие модалок
  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  // Открытие модалок
  const openModal = () => {
    setIsOrderDetailsOpened(true);
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
          <BurgerIngredients data={ingredients} />
          <BurgerConstructor data={ingredients} onOpenModal={openModal}/>
        </div>
      </main>

      {isOrderDetailsOpened &&
        <Modal
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails />
        </Modal>
      }
    </>
  );
}
