
import { useState } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import login from './login.module.css';

export function Register () {

  const [email, setEmail] = useState('test@yandex.ru');
  const [value, setValue] = useState('password');

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log('email = ', e.target.value);
  }

  return (
    <div className={login.login}>
      <h2 className='text text_type_main-medium'>Регистрация</h2>
      <div className={login.email}>
        <EmailInput onChange={onChange} value='' name={'email'} />
      </div>
      <PasswordInput onChange={onChange} value='' name={'password'} />
      <div className={login.button}>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${login.passwordRecovery} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Забыли пароль?</p>
        <Link to="/">Восстановить пароль</Link>
      </div>
    </div>
  )
}
