
import { useState } from 'react';
import style, { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import login from './login.module.css';
import { actionRequestAuth } from '../services/actions/actionsAuthorization';

export function Login () {

  const [data, setData] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const { state } = useLocation();
  const successAuth = useSelector(state => state.authorization.isAuth );

  // Если авторизация прошла успешно редирект на ранее открытую страницу
  if (successAuth) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  }

  //Сбор все данных с input
  const onChange = (e) => {
    setData( { ...data, [e.target.name]: e.target.value} );
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(actionRequestAuth(data));
  }

  return (
    <div className={login.login}>
      <h2 className='text text_type_main-medium'>Вход</h2>
      <form className={login.form}>
        <div className={login.email}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={onChange}
            value={data.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <PasswordInput onChange={onChange} value={data.password} name={'password'} />
        <div className={login.button}>
          <Button onClick={handleClick} type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
      <div className={`${login.input} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Вы — новый пользователь?</p>
        <Link className={login.link} to="/register">Зарегистрироваться</Link>
      </div>
      <div className={`${login.input} ${login.input_margin} text text_type_main-default text_color_inactive`}>
        <p className={login.paragraf}>Забыли пароль?</p>
        <Link className={login.link} to="/forgot-password">Восстановить пароль</Link>
      </div>
    </div>
  )
}
