
import { useState, useEffect, useRef, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profile from './profile.module.css';
import { actionRequestGetUser, actionRequestExit } from '../services/actions/actionsAuthorization';
import { api } from '../utils/Api';
import { getCookie, deleteCookie } from '../utils/cookie';

export function Profile () {

  const emailData = useSelector(state => state.authorization.user.email);
  const nameData = useSelector(state => state.authorization.user.name);
  const feedFailed = useSelector((state) => state.authorization.feedFailed);
  const feedRequest = useSelector((state) => state.authorization.feedRequest);

  console.log();
  const [data, setData] = useState({email: emailData, name: nameData, password: ''});
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const history = useHistory();
  const token = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');
  const tokenTetst = getCookie('token');
  // console.log('token', token);
  console.log('accessToken', accessToken);
  // console.log('tokenTetst', tokenTetst);

  const exitClick = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  )

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value});
  }

  const handleClickExit = useCallback(
    e => {
      e.preventDefault();
      api.logout(token)
        .then(res => {
          if (res.success === true) {
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
            dispatch(actionRequestExit());
            exitClick();
          }
        })
    },
    [data]
  )

  const handleClickSave = useCallback(
    e => {
      e.preventDefault();
      api.patchUser(token, data)
        .then(res => {
          if(res.success === true) {
            console.log('res = ', res);
          }
        })
    },
    [data]
  )

  const handleClickCancel = useCallback(
    e => {
      e.preventDefault();
      dispatch();
    },
    [data]
  )

  useEffect( () => {
    dispatch(actionRequestGetUser(accessToken));
  }, [] )

  return (
    <>
      {feedFailed && <h2 className={`text text_type_main-large`}>Произошла ошибка при получении данных</h2>}
      {feedRequest && <h2 className={`text text_type_main-large`}>Загрузка...</h2>}
      {!feedFailed && !feedRequest &&
        <>
          <div className={profile.profile}>
            <nav className={profile.nav}>
              <NavLink activeClassName={` ${profile.link} ${profile.link_activе} text text_type_main-medium text_color_inactive`} to="/profile">Профиль</NavLink>
              <NavLink activeClassName={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/">История заказов</NavLink>
              <NavLink onClick={handleClickExit} activeClassName={` ${profile.link} text text_type_main-medium text_color_inactive`} to="/profile">Выход</NavLink>
            </nav>
            <form className={profile.form}>
              <div className={`${profile.input} ${profile.input_margin}`}>
                <Input
                  type={'text'}
                  placeholder={'имя'}
                  onChange={onChange}
                  icon={'EditIcon'}
                  value={data.name}
                  name={'name'}
                  error={false}
                  ref={inputRef}
                  errorText={'Ошибка'}
                  size={'default'}
                />
                <div className={profile.email}>
                  <EmailInput onChange={onChange} value={data.email} name={'email'} />
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
