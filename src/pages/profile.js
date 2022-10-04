
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import profile from './profile.module.css';

export function Profile () {

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
    <div className={profile.profile}>
      <Link to="/">Профиль</Link>
      <Link to="/">История заказов</Link>
      <Link to="/">Выход</Link>
      <div className={`${profile.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'имя'}
          onChange={e => setValue(e.target.value)}
          icon={'CurrencyIcon'}
          value='test'
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={profile.email}>
        <EmailInput onChange={onChange} value='email' name={'email'} />
      </div>
      <PasswordInput onChange={onChange} value='' name={'password'} />
      <div className={`${profile.input} text text_type_main-default text_color_inactive`}>
        <p className={profile.paragraf}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
    </div>
  )
}
