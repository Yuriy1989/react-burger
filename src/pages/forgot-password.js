
import { useState, useCallback } from 'react';
import style, { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import forgotPassword from './forgot-password.module.css';
import { api } from '../utils/Api';
import { getCookie } from '../utils/cookie';

export function ForgotPassword () {

  const [email, setEmail] = useState('test@yandex.ru');
  const history = useHistory();
  const token = getCookie('accessToken');

  if (token) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  const resetPassword = useCallback(() => {
    history.replace({ pathname: '/reset-password' })
  },
    [history]
  );

  const onChange = e => {
    setEmail(e.target.value)
  }

    const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.getEmails(email)
        .then(res => {
          if (res.success === true) {
            resetPassword();
          }
        })
    },
    [email]
  )

  return (
    <div className={forgotPassword.forgotPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <form className={forgotPassword.form}>
        <div className={forgotPassword.email}>
          <EmailInput onChange={onChange} value={email} name={'email'} />
        </div>
        <div className={forgotPassword.button}>
          <Button onClick={handleClick} type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={`${forgotPassword.input} text text_type_main-default text_color_inactive`}>
        <p className={forgotPassword.paragraf}>Вспомнили пароль?</p>
        <Link className={forgotPassword.link} to="/login">Войти</Link>
      </div>
    </div>
  )
}
