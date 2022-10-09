
import { useState, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import login from './login.module.css';
import { dataTypes } from '../utils/types';

export function Login () {

  const [data, setData] = useState({email: '', password: ''});

  const onChange = (e) => {
    setData( { ...data, [e.target.name]: e.target.value} );
    console.log('email = ', e.target.value);
  }

  const handleClick = useCallback(
    e => {
      e.preventDefault();
    },
    [data]
  )

  return (
    <div className={login.login}>
      <h2 className='text text_type_main-medium'>Вход</h2>
      <div className={login.email}>
        <EmailInput onChange={onChange} value={data.email} name={'email'} />
      </div>
      <PasswordInput onChange={onChange} value={data.password} name={'password'} />
      <div className={login.button}>
        <Button onClick={handleClick} type="primary" size="medium">
          Войти
        </Button>
      </div>
      <div className={`${login.input} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Вы — новый пользователь?</p>
        <Link to="/register">Зарегистрироваться</Link>
      </div>
      <div className={`${login.input} ${login.input_margin} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Забыли пароль?</p>
        <Link to="/forgot-password">Восстановить пароль</Link>
      </div>
    </div>
  )
}
