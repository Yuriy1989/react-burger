
import { useState, useEffect, useRef, useCallback } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
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

  // const [data, setData] = useState({email: '', name: '', password: ''});
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const history = useHistory();
  const token = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');

  console.log('emailData', emailData);

  if (accessToken) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  const exitClick = useCallback(
    () => {
      history.replace({ pathname: '/login' });
    },
    [history]
  )

  const onChange = (e) => {
    // setData({ ...data, [e.target.name]: e.target.value});
    console.log('e', e);
    // setEmail();
    // setName();
    // setPassword();
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
    [emailData]
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
    [emailData]
  )

  const handleClickCancel = useCallback(
    e => {
      e.preventDefault();
      dispatch();
    },
    [emailData]
  )

  useEffect( () => {
    dispatch(actionRequestGetUser(accessToken));
    // setData({ ...data, ['email']: emailData, ['name']: nameData });
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
                  value={name}
                  name={'name'}
                  error={false}
                  ref={inputRef}
                  errorText={'Ошибка'}
                  size={'default'}
                />
                <div className={profile.email}>
                  <EmailInput onChange={onChange} value={email} name={'email'} />
                </div>
                <PasswordInput onChange={onChange} value={password} name={'password'} />
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
