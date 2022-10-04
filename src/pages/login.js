
import { useState } from 'react';
import style, { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import login from './login.module.css';

export function Login () {

  const [email, setEmail] = useState('test@yandex.ru');
  const [value, setValue] = useState('password');

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log('email = ', e.target.value);
  }

  return (
    <div className={login.login}>
      <h2 className='text text_type_main-medium'>Вход</h2>
      <div className={login.email}>
        <EmailInput onChange={onChange} value='' name={'email'} />
      </div>
      <PasswordInput onChange={onChange} value='' name={'password'} />
      <div className={login.button}>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <div className={`${login.input} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Вы — новый пользователь?</p>
        <Link to="/">Зарегистрироваться</Link>
      </div>
      <div className={`${login.input} ${login.input_margin} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Забыли пароль?</p>
        <Link to="/">Восстановить пароль</Link>
      </div>
    </div>
  )
}
