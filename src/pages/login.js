
import { useState, useCallback, useEffect } from 'react';
import style, { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import login from './login.module.css';
import { getCookie, setCookie } from '../utils/cookie';
import { api } from '../utils/Api';

export function Login () {

  const [data, setData] = useState({email: '', password: ''});
  const history = useHistory();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const timeCookie = 1200;

  //Если есть accessToken редирект на главную страницу
  // if (accessToken) {
  //   return (
  //     <Redirect to={ state?.from || '/' } />
  //   )
  // }

  //При успешной авторизации переход на главную страницу /
  const loginClick = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  )

  //Сбор все данных с input
  const onChange = (e) => {
    setData( { ...data, [e.target.name]: e.target.value} );
  }

  //Запрос к серверу для авторизации пользователя
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      api.login(data)
        .then(res => {
          if(res.success === true) {
            if (res.accessToken.indexOf('Bearer') === 0) {
              let accessToken = res.accessToken.split('Bearer ')[1];
              setCookie('accessToken', accessToken);
              setCookie('maxAgeAccessToken', { 'max-age': timeCookie });
              setCookie('refreshToken', res.refreshToken);
            }
            loginClick();
          }
        })
    },
    [data]
  )

  //При успешной обновлении токена переход страницу
  const redirectRefreshToken = useCallback(
    () => {
      history.replace({ pathname: '/profile' });
    },
    [history]
  )

  //При переходе на страницу Профиля, делаем запрос к серверу и сохраняем данные в Store
  useEffect(() => {
    if (!accessToken) {
      if (refreshToken) {
        api.refreshToken(refreshToken)
          .then(res => {
            if (res.success === true) {
              let newAccessToken = res.accessToken.split('Bearer ')[1];
              setCookie('accessToken', newAccessToken, { 'max-age': timeCookie });
              setCookie('refreshToken', res.refreshToken);
              redirectRefreshToken();
            }
          })
      } else {
        return (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    }
  }, [])

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
