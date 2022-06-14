import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import modal from './modal.module.css';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onClose, ingredient, isOrderDetailsOpened, isIngredientDetailsOpened }) => {

  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    (<>
      <div className={modal.modal}>
        {isOrderDetailsOpened && <OrderDetails onClose={onClose} />}
        {isIngredientDetailsOpened && <IngredientDetails onClose={onClose} ingredient={ingredient} />}
      </div>
      <ModalOverlay onClick={onClose} />
    </>
    ), modalsContainer
  );
}

export default Modal;
