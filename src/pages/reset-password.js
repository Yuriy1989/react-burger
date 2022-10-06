
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import resetPassword from './reset-password.module.css';
import { api } from '../utils/Api';

export function ResetPassword() {

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const onChangeInput = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = () => {
    api.resetPassword(password, token)
      .then(res => {
        console.log('res =', res);
      })
  }

  return (
    <div className={resetPassword.resetPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={`${resetPassword.input_margin}`}>
        <PasswordInput value={password} onChange={onChangeInput} name={'password'} />
      </div>
      <div className={`${resetPassword.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setToken(e.target.value)}
          value={token}
          name={'name'}
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
