import React from 'react';
import ReactDOM from 'react-dom';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import loader from './loader.module.css';
export default function Loader() {

  return (
    <>
      <div className={loader.loader}>
        <p className={` ${loader.text} text text_type_main-medium `}>Загрузка</p>
        <div className={` ${loader.spinner} text text_type_digits-large `}></div>
      </div>
    </>
  )
}
