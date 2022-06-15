import React from 'react';
import modalOverlay from './modalOverlay.module.css';
import { funcTypes } from '../../utils/types';

export default function ModalOverlay({ onClick }) {
  return (
    <div className={modalOverlay.modalOverlay} onClick={onClick}></div>
  )
}

ModalOverlay.propTypes = {
  onClick: funcTypes.isRequired
}
