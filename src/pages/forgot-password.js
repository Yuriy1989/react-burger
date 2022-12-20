
import { useState, useCallback } from 'react';
import style, { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import forgotPassword from './forgot-password.module.css';
import { api } from '../utils/Api';
import { setCookie } from '../utils/cookie';
import { useForm } from '../hooks/useForm';

export function ForgotPassword () {

  const {values, handleChange} = useForm({email: ''});
  const history = useHistory();

  //При успешном отправке запроса на восстановление
  //пароль делаем редирект на ввода нового пароля и ключа
  const resetPassword = useCallback(
    () => {
      history.replace({ pathname: '/reset-password' })
    },
    [history]
  );

  //запрос к серверу для восстановление пароля по email
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.getEmails(values.email)
        .then(res => {
          if (res.success === true) {
            setCookie('forgotPassword', res.success, { expires: 200 });
            resetPassword();
          }
        })
    },
    [values]
  )

  return (
    <div className={forgotPassword.forgotPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <form className={forgotPassword.form}>
        <div className={forgotPassword.email}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleChange}
            value={values.email}
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
