import React from 'react';
import modalOverlay from './modalOverlay.module.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/getIngredientforOpenModal';

export default function ModalOverlay() {
const dispatch = useDispatch();
const closeModals = () => dispatch(closeModal());

  return (
    <div className={modalOverlay.modalOverlay} onClick={closeModals}></div>
  )
}
