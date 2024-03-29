import React, { FC } from 'react';
import style, { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';
import { NavLink, useHistory, Link } from 'react-router-dom';

const AppHeader: FC = () => {

  const history = useHistory();

  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.navigation}>
        <ul className={appHeaderStyles.menu}>
          <li>
            <button className={`${appHeaderStyles.button} text text_type_main-default`}>
              <div className="p-2" >
                <BurgerIcon type={ history.location.pathname === '/' ? 'primary' : 'secondary' }/>
              </div>
              <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/" exact={true}>Конструктор</NavLink>
            </button>
          </li>
          <li>
            <button className={`${appHeaderStyles.button} text text_type_main-default`}>
              <div className="p-2">
                <ListIcon type={ history.location.pathname === '/feed' ? 'primary' : 'secondary' } />
              </div>
              <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/feed" exact={true}>Лента заказов</NavLink>
            </button>
          </li>
        </ul>
        <div className={appHeaderStyles.logo}>
          <Link to={{ pathname: `/` }}>
            <Logo />
          </Link>
        </div>
        <button className={` ${appHeaderStyles.profile} ${appHeaderStyles.button} text text_type_main-default`}>
          <div className="p-2">
            <ProfileIcon type={ history.location.pathname === '/profile' || history.location.pathname ==='/profile/orders' ? 'primary' : 'secondary' } />
          </div>
          <NavLink activeClassName={` ${appHeaderStyles.linkActive} `} className={` ${appHeaderStyles.link} text text_type_main-default text_color_inactive`} to="/profile" >Личный кабинет</NavLink>
        </button>
      </nav>
    </header>
  );
}

export default AppHeader;

