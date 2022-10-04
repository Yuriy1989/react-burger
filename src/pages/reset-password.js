
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import resetPassword from './reset-password.module.css';

export function ResetPassword() {

  const [email, setEmail] = useState('test@yandex.ru');
  const [value, setValue] = useState('password');
  const inputRef = useRef(null)

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log('email = ', e.target.value);
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <div className={resetPassword.resetPassword}>
      <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
      <div className={`${resetPassword.input_margin}`}>
        <PasswordInput onChange={onChange} value='' name={'password'} />
      </div>
      <div className={`${resetPassword.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setValue(e.target.value)}
          icon={'CurrencyIcon'}
          value=''
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={resetPassword.button}>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <div className={`${resetPassword.input} text text_type_main-default text_color_inactive`}>
        <p className={resetPassword.paragraf}>Вспомнили пароль??</p>
        <Link to="/">Войти</Link>
      </div>
    </div>
  )
}
