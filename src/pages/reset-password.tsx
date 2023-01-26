
import { FC, useCallback } from 'react';
import style, { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import resetPassword from './reset-password.module.css';
import { getCookie } from '../utils/cookie';
import { api } from '../utils/Api';
import { useForm } from '../hooks/useForm';

const ResetPassword: FC = () => {

  const {values, handleChange} = useForm({password: '', token: ''});
  const history = useHistory();
  const forgotPassword: string | undefined = getCookie('forgotPassword');

  //Если forgotPassword не существует в куках, то делаем редирект на forgot-password для ввода email
  if (!forgotPassword) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
    )
  }

  //При успешной смене пароля делает редирект на страницу авторизации
  const loginRedirect = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  );

  //Запрос к серверу для смены пароля
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.resetPassword(values)
        .then(res => {
          if (res.success === true) {
            loginRedirect();
          }
        })
    }, [values]
  )

  return (
    <div className={resetPassword.resetPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={`${resetPassword.input_margin}`}>
        <PasswordInput value={`${values?.password}`} onChange={handleChange} name={'password'} />
      </div>
      <form className={`${resetPassword.form}`} onSubmit={handleClick}>
        <div className={`${resetPassword.input_margin}`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={`${values?.token}`}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={resetPassword.button}>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div className={`${resetPassword.input} text text_type_main-default text_color_inactive`}>
        <p className={resetPassword.paragraf}>Вспомнили пароль?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  )
}

export default ResetPassword;
