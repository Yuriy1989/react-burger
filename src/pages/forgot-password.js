
import { useState, useCallback } from 'react';
import style, { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import forgotPassword from './forgot-password.module.css';
import { api } from '../utils/Api';
import { getCookie, setCookie } from '../utils/cookie';

export function ForgotPassword () {

  const [email, setEmail] = useState('');
  const history = useHistory();
  const accessToken = getCookie('accessToken');

  //Если accessToken существует в куках, то делаем редирект на главную страницу /
  if (accessToken) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  //При успешном отправке запроса на восстановление
  //пароль делаем редирект на ввода нового пароля и ключа
  const resetPassword = useCallback(
    () => {
      history.replace({ pathname: '/reset-password' })
    },
    [history]
  );

    const onChange = e => {
    setEmail(e.target.value)
  }

  //запрос к серверу для восстановление пароля по email
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.getEmails(email)
        .then(res => {
          if (res.success === true) {
            setCookie('forgotPassword', res.success, { expires: 200 });
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
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={onChange}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
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
