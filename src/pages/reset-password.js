
import { useState, useCallback } from 'react';
import style, { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import resetPassword from './reset-password.module.css';
import { getCookie } from '../utils/cookie';
import { api } from '../utils/Api';

export function ResetPassword() {

  const [data, setData] = useState( {password: '', token: ''} );
  const history = useHistory();
  const accessToken = getCookie('accessToken');
  const forgotPassword = getCookie('forgotPassword');

  if (accessToken) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  if (!forgotPassword) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
    )
  }

  const loginRedirect = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  );

  const onChange = (e) => {
    setData( {...data, [e.target.name]: e.target.value } );
  }

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.resetPassword(data)
        .then(res => {
          if (res.success === true) {
            loginRedirect();
          }
        })
    }, [data]
  )

  return (
    <div className={resetPassword.resetPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={`${resetPassword.input_margin}`}>
        <PasswordInput value={data.password} onChange={onChange} name={'password'} />
      </div>
      <div className={`${resetPassword.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={data.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={resetPassword.button}>
        <Button onClick={handleClick} type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <div className={`${resetPassword.input} text text_type_main-default text_color_inactive`}>
        <p className={resetPassword.paragraf}>Вспомнили пароль?</p>
        <Link to="/">Войти</Link>
      </div>
    </div>
  )
}
