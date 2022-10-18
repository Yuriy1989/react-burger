
import { useState, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import resetPassword from './reset-password.module.css';
import { api } from '../utils/Api';

export function ResetPassword() {

  const [data, setData] = useState({password: '', token: ''});
  const history = useHistory();

  const onChangeInput = (e) => {
    setData({...data, [e.target.name]: e.target.value });
  }

  const loginRedirect = useCallback(() => {
    history.replace({ pathname: '/login' });
  },
    [history]
  );

  const handleClick = useCallback(
    () => {
      api.resetPassword(data)
        .then(res => {
          if (res.success === true) {
            loginRedirect();
          }
        })
    }, [history]
  )

  return (
    <div className={resetPassword.resetPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={`${resetPassword.input_margin}`}>
        <PasswordInput value={data.password} onChange={onChangeInput} name={'password'} />
      </div>
      <div className={`${resetPassword.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChangeInput}
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
