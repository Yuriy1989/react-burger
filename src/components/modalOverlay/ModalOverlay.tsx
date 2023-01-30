import React, { useCallback } from 'react';
import modalOverlay from './modalOverlay.module.css';
import { useHistory } from 'react-router-dom';

export default function ModalOverlay() {

const history = useHistory();

const closeModals = useCallback(
  () => {
    history.goBack();
  }, []
)

  return (
    <div className={modalOverlay.modalOverlay} onClick={closeModals}></div>
  )
}
