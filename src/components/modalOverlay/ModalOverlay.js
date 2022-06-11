import React from 'react';
import modalOverlay from './modalOverlay.module.css';

export default function ModalOverlay({ onClick }) {
  return (
    <div className={modalOverlay.modalOverlay} onClick={onClick}></div>
  )
}
