import React from 'react';
import style, { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';
import { NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.navigation}>
        <ul className={appHeaderStyles.menu}>
          <li>
            <button className={`${appHeaderStyles.button} ${appHeaderStyles.button_active} text text_type_main-default`}>
              <div className="p-2">
                <BurgerIcon type="primary" />
              </div>
              <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/ingredients">Конструктор</NavLink>
            </button>
          </li>
          <li>
            <button className={`${appHeaderStyles.button} text text_type_main-default`}>
              <div className="p-2">
                <ListIcon type="secondary" />
              </div>
              <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/feed">Лента заказов</NavLink>
            </button>
          </li>
        </ul>
        <div className={appHeaderStyles.logo}><Logo /></div>
        <button className={` ${appHeaderStyles.profile} ${appHeaderStyles.button} text text_type_main-default`}>
          <div className="p-2">
            <ProfileIcon type="secondary" />
          </div>
          <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/login">Личный кабинет</NavLink>
        </button>
      </nav>
    </header>
  );
}
