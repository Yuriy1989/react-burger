import React, {useState, useEffect} from 'react';
import app from './app.module.css';
import { api } from '../../utils/Api';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import Modal from '../modal/Modal';

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

  // Открытие модалки "Счет на оплату"
  const handleOrderDetailsOpenModal = () => {
    setIsOrderDetailsOpened(true);
  };

  // Стейт для открытия модалки с информацией об открытом ингредиенте
  const [selectedIngredient, setselectedIngredient] = useState({});

  // Открытие модалки "Информация об ингредиенте"
  const handleIngredientDetailsOpenModal = (item) => {
    setIsIngredientDetailsOpened(true);
    setselectedIngredient(item);
  };

  // Получение данных с сервера
  const getIngredients = () => {
    api.getIngridients()
      .then(res => setIngredients(res.data))
      .catch(console.log);
  }

  // Хук получение данных с сервера только один раз при рендере страницы
  useEffect(() => {
    getIngredients();
  }, []);

  // Стейт для передачи данных в компоненты для отрисовки
  const [ingredients, setIngredients] = useState([]);

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
          onClose={closeAllModals}
          isOrderDetailsOpened={isOrderDetailsOpened}
        >
        </Modal>
      }

      {isIngredientDetailsOpened &&
        <Modal
          onClose={closeAllModals}
          ingredient={selectedIngredient}
          isIngredientDetailsOpened={isIngredientDetailsOpened}
        >
        </Modal>
      }
    </>
  );
}
