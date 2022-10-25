import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import style, { CloseIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import modal from './modal.module.css';
import { text, component } from '../../utils/types';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, children }) => {

  const history = useHistory();
  const accessToken = getCookie('accessToken');

  //Если нет accessToken редирект на страницу авторизации login
  if (!accessToken) {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }

  // Обработка нажатия Esc
  const handleEscKeydown = useCallback((event) => {
    event.key === "Escape" && closeModals();
  }, []);

  // Закрытие модалки - возврат на предыдущую страницу
  const closeModals = useCallback(
    () => {
      history.goBack();
    }, []
  )

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
            <div className={modal.closeButton}><CloseIcon type="primary" onClick={closeModals} /></div>
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

Modal.propTypes = {
  title: text.isRequired,
  children: component.isRequired
}
