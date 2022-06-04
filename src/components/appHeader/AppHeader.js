import React from 'react';
import style, { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';

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
              Конструктор
            </button>
          </li>
          <li>
            <button className={`${appHeaderStyles.button} text text_type_main-default`}>
              <div className="p-2">
                <ListIcon type="secondary" />
              </div>
              Лента заказов
            </button>
          </li>
        </ul>
        <div className={appHeaderStyles.logo}><Logo /></div>
        <button className={` ${appHeaderStyles.profile} ${appHeaderStyles.button} text text_type_main-default`}>
          <div className="p-2">
            <ProfileIcon type="secondary" />
          </div>
          Личный кабинет
        </button>
      </nav>
    </header>
  );
}
