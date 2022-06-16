import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import modal from './modal.module.css';
import { funcTypes } from '../../utils/types';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onClose, title, children }) => {

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
        <div className={modal.modalForm}>
          <div className={modal.headerDetails}>
            <p className={` ${modal.headerText} text text_type_main-large`}>{title}</p>
            <div className={modal.closeButton}><CloseIcon type="primary" onClick={onClose} /></div>
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>
    ), modalsContainer
  );
}

export default Modal;

Modal.propTypes = {
  onClose: funcTypes.isRequired
}
