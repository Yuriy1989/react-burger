import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import modal from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, children }) => {

  // Обработка нажатия Esc
  const handleEscKeydown = (event) => {
    event.key === "Escape" && onOverlayClick();
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
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>
    ),
    modalsContainer
  );
}

export default Modal;
