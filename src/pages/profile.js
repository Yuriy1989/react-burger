
import { useState, useRef, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profile from './profile.module.css';
import { actionRequestExit } from '../services/actions/actionsAuthorization';
import { api } from '../utils/Api';
import { getCookie, deleteCookie } from '../utils/cookie';

export function Profile () {

  const emailData = useSelector(state => state.authorization.user.email);
  const nameData = useSelector(state => state.authorization.user.name);
  const [data, setData] = useState({email: emailData, name: nameData, password: ''});
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const history = useHistory();
  const token = getCookie('refreshToken');

  const exitClick = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  )

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.logout(token)
        .then(res => {
          if (res.success === true) {
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
            dispatch(actionRequestExit());
            exitClick();
          }
        })
    },
    [data]
  )

  return (
    <div className={profile.profile}>
      <nav className={profile.nav}>
        <NavLink activeClassName={` ${profile.link} ${profile.link_activе} text text_type_main-medium text_color_inactive`} to="/profile">Профиль</NavLink>
        <NavLink activeClassName={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/">История заказов</NavLink>
        <NavLink onClick={handleClick} activeClassName={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/profile">Выход</NavLink>
      </nav>
      <form>
        <div className={`${profile.input} ${profile.input_margin}`}>
          <Input
            type={'text'}
            placeholder={'имя'}
            onChange={onChange}
            icon={'EditIcon'}
            value={data.name}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
          <div className={profile.email}>
            <EmailInput onChange={onChange} value={data.email} name={'email'} />
          </div>
          <PasswordInput onChange={onChange} value={data.password} name={'password'} />
        </div>
      </form>
      <div className={`${profile.paragraf} text text_type_main-default text_color_inactive`}>
        <p >В этом разделе вы можете изменить свои персональные данные</p>
      </div>
    </div>
  )
}
