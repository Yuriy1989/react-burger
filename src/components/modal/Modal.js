import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './modal.module.css';
import vector1 from '../../images/Vector_1.svg';
import vector2 from '../../images/Vector_2.svg';
import vector3 from '../../images/Vector_3.svg';
import ModalOverlay from '../modalOverlay/ModalOverlay';


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
      <div>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>
    ),
    modalsContainer
  );
}

export default Modal;
