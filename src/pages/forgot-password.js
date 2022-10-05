
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import forgotPassword from './forgot-password.module.css';

export function ForgotPassword () {

  const [email, setEmail] = useState('test@yandex.ru');
  const [value, setValue] = useState('password');
  const inputRef = useRef(null)

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log('email = ', e.target.value);
  }

  return (
    <div className={forgotPassword.forgotPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={forgotPassword.email}>
        <EmailInput onChange={onChange} value='' name={'email'} />
      </div>
      <div className={forgotPassword.button}>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <div className={`${forgotPassword.input} text text_type_main-default text_color_inactive`}>
        <p className={forgotPassword.paragraf}>Вспомнили пароль?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  )
}
