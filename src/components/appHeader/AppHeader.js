import React from 'react';
import logo from '../../images/logo.svg';
import iconConstructor from '../../images/iconConstructor.svg';
import profile from '../../images/profile.svg';
import list from '../../images/list.svg';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import './appHeader.css';

export default function AppHeader() {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__menu">
          <li>
            <button className="header__button text text_type_main-default header__button_active">
              <img src={iconConstructor} className="header__icon"/>Конструктор
            </button>
          </li>
          <li>
            <button className="header__button text text_type_main-default">
              <img src={list} className="header__icon"/>Лента заказов
            </button>
          </li>
        </ul>
        <img src={logo} className="header__logo" alt="Маленький космический бургер"/>
        <button className="header__profile header__button text text_type_main-default"><img src={profile} className="header__icon"></img>Личный кабинет</button> 
      </nav>
    </header>
  );
}
