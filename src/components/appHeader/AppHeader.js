import React from 'react';
import logo from '../../images/logo.svg';
import iconConstructor from '../../images/iconConstructor.svg';
import profile from '../../images/profile.svg';
import list from '../../images/list.svg';
import style, { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.header__nav}>
        <ul className={appHeaderStyles.header__menu}>
          <li>
            <button className={`${appHeaderStyles.header__button} ${appHeaderStyles.header__button_active} text text_type_main-default`}>
              <img src={iconConstructor} className={appHeaderStyles.header__icon}/>Конструктор

            </button>
          </li>
          <li>
            <button className={`${appHeaderStyles.header__button} text text_type_main-default`}>
              <img src={list} className={appHeaderStyles.header__icon}/>Лента заказов
            </button>
          </li>
        </ul>
        {/* <img src={logo} className={appHeaderStyles.header__logo} alt="Маленький космический бургер"/> */}
        <div className={appHeaderStyles.header__logo}><Logo /> </div>
        <button className={` ${appHeaderStyles.header__profile} ${appHeaderStyles.header__button} text text_type_main-default`}><img src={profile} className={appHeaderStyles.header__icon}></img>Личный кабинет</button>
      </nav>
    </header>
  );
}
