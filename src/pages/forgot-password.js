
import { useState, useRef, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import forgotPassword from './forgot-password.module.css';
import { api } from '../utils/Api';

export function ForgotPassword () {

  const [email, setEmail] = useState('test@yandex.ru');

  const onChange = e => {
    setEmail(e.target.value)
  }

  const history = useHistory();

  const resetPassword = useCallback(() => {
    history.replace({ pathname: '/reset-password' })
  },
    [history]
  );

  const handleClick = () => {
    api.getEmails(email)
      .then(res => {
        if(res.success === true) {
          resetPassword();
        }
      })
  }

  return (
    <div className={forgotPassword.forgotPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={forgotPassword.email}>
        <EmailInput onChange={onChange} value={email}  name={'email'} />
      </div>
      <div className={forgotPassword.button}>
        <Button onClick={handleClick} type="primary" size="medium">
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
