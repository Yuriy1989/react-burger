import React from 'react';
import modalOverlay from './modalOverlay.module.css';
import { useDispatch } from 'react-redux';
import { closeInfoSelectedInrgedient } from '../../services/actions/getIngredientforOpenModal';

export default function ModalOverlay() {
const dispatch = useDispatch();
const closeModal = () => dispatch(closeInfoSelectedInrgedient());

  return (
    <div className={modalOverlay.modalOverlay} onClick={closeModal}></div>
  )
}
