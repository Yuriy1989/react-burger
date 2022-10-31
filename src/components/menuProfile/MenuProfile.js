import { useCallback } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import menuProfile from './menuProfile.module.css';
import { getCookie } from '../../utils/cookie';
import { actionRequestExit } from '../../services/actions/actionsAuthorization';
import { useDispatch } from 'react-redux';

export default function MenuProfile () {

  const dispatch = useDispatch();
  const refreshToken = getCookie('refreshToken');

  //Запрос к серверу для выхода и удаления всех токинов из кук
  const handleClickExit = () => {
      dispatch(actionRequestExit(refreshToken));
  }

  return (
    <nav className={menuProfile.nav}>
      <NavLink activeClassName={`${menuProfile.link_activе}`} className={` ${menuProfile.link} text text_type_main-medium text_color_inactive`} to="/profile" exact={true}>Профиль</NavLink>
      <NavLink activeClassName={`${menuProfile.link_activе}`} className={` ${menuProfile.link} text text_type_main-medium text_color_inactive`} to="/profile/orders" exact={true}>История заказов</NavLink>
      <NavLink onClick={handleClickExit} className={` ${menuProfile.link} text text_type_main-medium text_color_inactive`} to="/login">Выход</NavLink>
    </nav>
  );
}
