import React from 'react';
import style, { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';
import { NavLink, useHistory } from 'react-router-dom';

export default function AppHeader() {

  const history = useHistory();

  console.log('history = ', history.location.pathname);

  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.navigation}>
        <ul className={appHeaderStyles.menu}>
          <li>
            <button className={`${appHeaderStyles.button} text text_type_main-default`}>
              <div className="p-2" >
                <BurgerIcon type={ history.location.pathname == '/' ? 'primary' : 'secondary' }/>
              </div>
              <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/">Конструктор</NavLink>
            </button>
          </li>
          <li>
            <button className={`${appHeaderStyles.button} text text_type_main-default`}>
              <div className="p-2">
                <ListIcon type={ history.location.pathname == '/feed' ? 'primary' : 'secondary' } />
              </div>
              <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/feed">Лента заказов</NavLink>
            </button>
          </li>
        </ul>
        <div className={appHeaderStyles.logo}><Logo /></div>
        <button className={` ${appHeaderStyles.profile} ${appHeaderStyles.button} text text_type_main-default`}>
          <div className="p-2">
            <ProfileIcon type={ history.location.pathname == '/profile' ? 'primary' : 'secondary' } />
          </div>
          <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/profile">Личный кабинет</NavLink>
        </button>
      </nav>
    </header>
  );
}
