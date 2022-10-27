import { useCallback } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory } from 'react-router-dom';
import menuProfile from './menuProfile.module.css';
import { getCookie, deleteCookie } from '../../utils/cookie';
import { api } from '../../utils/Api';

export default function MenuProfile () {

  const history = useHistory();
  const refreshToken = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');

  //Запрос к серверу для выхода и удаления всех токинов из кук
  const handleClickExit = useCallback(
    () => {
      api.logout(refreshToken)
        .then(res => {
          if (res.success === true) {
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
            exitClick();
          }
        })
    },
    [refreshToken]
  )

  //При успешном выходе делает редирект на страницу авторизации
  const exitClick = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  )

  return (
    <nav className={menuProfile.nav}>
      <NavLink activeClassName={`${menuProfile.link_activе}`} className={` ${menuProfile.link} text text_type_main-medium text_color_inactive`} to="/profile" exact={true}>Профиль</NavLink>
      <NavLink activeClassName={`${menuProfile.link_activе}`} className={` ${menuProfile.link} text text_type_main-medium text_color_inactive`} to="/profile/orders" exact={true}>История заказов</NavLink>
      <NavLink onClick={handleClickExit} className={` ${menuProfile.link} text text_type_main-medium text_color_inactive`} to="/profile">Выход</NavLink>
    </nav>
  );
}
