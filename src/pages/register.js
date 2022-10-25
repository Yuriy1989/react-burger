
import { useState, useRef, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import register from './register.module.css';
import { getCookie } from '../utils/cookie';
import { api } from '../utils/Api';

export function Register () {

  const [data, setData] = useState({email: '', password: '', name: ''});
  const inputRef = useRef(null)
  const accessToken = getCookie('accessToken');
  const history = useHistory();

  //При успешной регистрации, делаем редирект на страницу атворизации
  const loginRequest = useCallback(() => {
    history.replace({ pathname: '/login' })
  },
    [history]
  );

  //Если accessToken существует в куках, то делаем редирект на главную страницу /
  if (accessToken) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  const onChange = (e) => {
    setData( {...data, [e.target.name]: e.target.value} );
  }

  //Запрос к серверу для регистрации пользователя
  const handleClick = (e) => {
    e.preventDefault();
    api.register(data)
      .then(res => {
        if(res.success === true) {
          loginRequest();
        }
      })
  }

  return (
    <div className={register.register}>
      <h2 className='text text_type_main-medium'>Регистрация</h2>
      <form className={register.form}>
        <div className={`${register.input_margin}`}>
          <Input
            type={'text'}
            placeholder={'имя'}
            onChange={onChange}
            value={data.name}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={register.email}>
          <EmailInput onChange={onChange} value={data.email} name={'email'} />
        </div>
          <PasswordInput onChange={onChange} value={data.password} name={'password'} />
        <div className={register.button}>
          <Button type="primary" size="medium" onClick={handleClick}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${register.input} text text_type_main-default text_color_inactive`}>
        <p className={register.paragraf}>Уже зарегистрированы?</p>
        <Link className={register.link} to="/login">Войти</Link>
      </div>
    </div>
  )
}
