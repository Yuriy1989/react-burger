
import { useState, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import login from './login.module.css';
import { actionRequestAuth } from '../services/actions/actionsAuthorization';
import { getCookie } from '../utils/cookie';

export function Login () {

  const [data, setData] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const history = useHistory();

  const token = getCookie('token');

  const loginClick = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  )

  if (token) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  const onChange = (e) => {
    setData( { ...data, [e.target.name]: e.target.value} );
  }

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      dispatch(actionRequestAuth(data));
      loginClick();
    },
    []
  )

  return (
    <div className={login.login}>
      <h2 className='text text_type_main-medium'>Вход</h2>
      <form className={login.form}>
        <div className={login.email}>
          <EmailInput onChange={onChange} value={data.email} name={'email'} />
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
