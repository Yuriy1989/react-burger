
import { useState } from 'react';
import style, { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import login from './login.module.css';

export function Login () {

  const [email, setEmail] = useState('test@yandex.ru');
  const [value, setValue] = useState('password');

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log('email = ', e.target.value);
  }

  return (
    <div className={login.login}>
      <h2>Вход</h2>
      <EmailInput onChange={onChange} value={email} name={'email'} />
      <Input
        type={'text'}
        placeholder={'placeholder'}
        // onChange={e => setValue(e.target.value)}
        icon={'CurrencyIcon'}
        value={value}
        name={'name'}
        error={false}
        // ref={inputRef}
        // onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
      <Button type="primary" size="medium">
        Войти
      </Button>
      <p>Вы — новый пользователь?</p>
      <Link to="/">Зарегистрироваться</Link>
      <p>Забыли пароль?</p>
      <Link to="/">Восстановить пароль</Link>
    </div>
  )
}
