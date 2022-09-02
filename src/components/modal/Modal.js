import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import modal from './modal.module.css';
import { useDispatch } from 'react-redux';
import { closeInfoSelectedInrgedient } from '../../services/actions/getIngredientforOpenModal';


const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, children }) => {

  const dispatch = useDispatch();

  const closeModal = () => dispatch(closeInfoSelectedInrgedient());

  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && dispatch(closeInfoSelectedInrgedient());
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
        <div className={modal.modalForm}>
          <div className={modal.headerDetails}>
            <p className={` ${modal.headerText} text text_type_main-large`}>{title}</p>
            <div className={modal.closeButton}><CloseIcon type="primary" onClick={closeModal} /></div>
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay />
    </>
    ), modalsContainer
  );
}

export default Modal;
