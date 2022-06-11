import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import modal from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, onEscKeydown, children }) => {

  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
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
