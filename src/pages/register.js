
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import register from './register.module.css';

export function Register () {

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
    <div className={register.register}>
      <h2 className='text text_type_main-medium'>Регистрация</h2>
      <div className={`${register.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'имя'}
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
      <div className={register.email}>
        <EmailInput onChange={onChange} value='' name={'email'} />
      </div>
        <PasswordInput onChange={onChange} value='' name={'password'} />
      <div className={register.button}>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${register.input} text text_type_main-default text_color_inactive`}>
        <p className={register.paragraf}>Уже зарегистрированы?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  )
}
