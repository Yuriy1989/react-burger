
import { useState, useEffect, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profile from './profile.module.css';
import { actionRequestGetUser, actionRequestPatchUser } from '../services/actions/actionsAuthorization';
import { api } from '../utils/Api';
import { getCookie, deleteCookie } from '../utils/cookie';

export function Profile () {

  const email = useSelector(state => state.authorization.user.email);
  const name = useSelector(state => state.authorization.user.name);
  const error = useSelector(state => state.authorization.error);
  const feedFailed = useSelector((state) => state.authorization.feedFailed);
  const feedRequest = useSelector((state) => state.authorization.feedRequest);
  const [data, setData] = useState({name: '', email: '', password: ''});
  const dispatch = useDispatch();
  const history = useHistory();
  const refreshToken = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');

  console.log('accessToken = ', accessToken);

  //Сбор данных из всех input
  const onChange = (e) => {
    setData( { ...data, [e.target.name]: e.target.value} );
  }

  //При успешном выходе делает редирект на страницу авторизации
  const exitClick = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  )

  //Запрос к серверу для выхода и удаления всех токинов из кук
  const handleClickExit = useCallback(
    () => {
      api.logout(refreshToken)
        .then(res => {
          if (res.success === true) {
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
            exitClick();
          }
        })
    },
    [data]
  )

  //Обновление данных о пользователе, с сохранением их в Store
  const handleClickSave = useCallback(
    e => {
      e.preventDefault();
      dispatch(actionRequestPatchUser(data, accessToken));
    },
    [data]
  )

  //Отмена всех введеных ранее данных
  const handleClickCancel = useCallback(
    e => {
      e.preventDefault();
      setData( {name: name, email: email, password: ''} );
    },
    [data]
  )

  //При переходе на страницу Профиля, делаем запрос к серверу и сохраняем данные в Store
  useEffect(() => {
    if (!accessToken) {
        <Redirect to={{ pathname: '/login' }} />
    } else {
        dispatch(actionRequestGetUser(accessToken));
    }
  }, [])

  useEffect( () => {
    setData( {name: name ? name : '', email: email ? email : '', password: ''} );
  }, [ email, name ] )

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {!feedFailed && !feedRequest &&
        <>
          <div className={profile.profile}>
            <nav className={profile.nav}>
              <NavLink className={` ${profile.link} ${profile.link_activе} text text_type_main-medium text_color_inactive`} to="/profile">Профиль</NavLink>
              <NavLink className={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/orders">История заказов</NavLink>
              <NavLink onClick={handleClickExit} className={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/profile">Выход</NavLink>
            </nav>
            <form className={profile.form}>
              <div className={`${profile.input} ${profile.input_margin}`}>
                <Input
                  type={'text'}
                  placeholder={'имя'}
                  icon={'EditIcon'}
                  onChange={onChange}
                  value={data.name}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                />
                <div className={profile.email}>
                  <EmailInput onChange={onChange} value={data.email}  placeholder={'имя'} name={'email'} />
                  {error && <p className={`input__error text_type_main-default`}>ошибка: {error} </p>}
                </div>
                <PasswordInput onChange={onChange} value={data.password} name={'password'} />
              </div>
              <div className={profile.button}>
                <Button onClick={handleClickSave} type="primary" size="medium">
                  Сохранить
                </Button>
                <Button onClick={handleClickCancel} type="primary" size="medium">
                  Отмена
                </Button>
              </div>
            </form>
            <div className={`${profile.paragraf} text text_type_main-default text_color_inactive`}>
              <p >В этом разделе вы можете изменить свои персональные данные</p>
            </div>
          </div>
        </>
      }
    </>
  )
}
