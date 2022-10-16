
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import profile from './profile.module.css';
import { getCookie } from '../utils/cookie';
import { actionRequestExit } from '../services/actions/actionsAuthorization';

export function Profile () {

  const [email, setEmail] = useState('test@yandex.ru');
  const [value, setValue] = useState('password');
  const inputRef = useRef(null)
  const dispatch = useDispatch();

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const handleClick = () => {
    const data = getCookie('token');
    dispatch(actionRequestExit(data));
  }

  return (
    <div className={profile.profile}>
      <nav className={profile.nav}>
        <NavLink activeClassName={` ${profile.link} ${profile.link_activе} text text_type_main-medium text_color_inactive`} to="/profile">Профиль</NavLink>
        <NavLink activeClassName={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/">История заказов</NavLink>
        <NavLink onClick={handleClick} activeClassName={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/profile">Выход</NavLink>
      </nav>
      <div className={`${profile.input} ${profile.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'имя'}
          onChange={e => setValue(e.target.value)}
          icon={'CurrencyIcon'}
          value='test'
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <div className={profile.email}>
          <EmailInput onChange={onChange} value='email' name={'email'} />
        </div>
        <PasswordInput onChange={onChange} value='' name={'password'} />
      </div>
      <div className={`${profile.paragraf} text text_type_main-default text_color_inactive`}>
        <p >В этом разделе вы можете изменить свои персональные данные</p>
      </div>
    </div>
  )
}
