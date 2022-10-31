
import { useState, useEffect, useCallback } from 'react';
import MenuProfile from '../components/menuProfile/MenuProfile';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionRequestPatchUser } from '../services/actions/actionsAuthorization';
import profile from './profile.module.css';
import { getCookie } from '../utils/cookie';

export function Profile () {

  const email = useSelector(state => state.authorization.user.email);
  const name = useSelector(state => state.authorization.user.name);
  const error = useSelector(state => state.authorization.error);
  const [data, setData] = useState({name: '', email: '', password: '', buttonActive: false});
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  //Сбор данных из всех input
  const onChange = (e) => {
    setData( { ...data, [e.target.name]: e.target.value, buttonActive: true} );
  }

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
      setData( {name: name, email: email, password: '', buttonActive: false} );
    },
    [data]
  )

  useEffect( () => {
    setData( {name: name ? name : '', email: email ? email : '', password: '', buttonActive: false} );
  }, [ email, name ] )

  return (
    <>
      <>
        <div className={profile.profile}>
          <MenuProfile />
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
                <EmailInput onChange={onChange} value={data.email} placeholder={'имя'} name={'email'} />
                {error && <p className={`input__error text_type_main-default`}>ошибка: {error} </p>}
              </div>
              <PasswordInput onChange={onChange} value={data.password} name={'password'} />
            </div>
            <div className={profile.button}>
              <Button disabled={ data.buttonActive ? false : true } onClick={handleClickSave} type="primary" size="medium">
                Сохранить
              </Button>
              <Button disabled={ data.buttonActive ? false : true } onClick={handleClickCancel} type="primary" size="medium">
                Отмена
              </Button>
            </div>
          </form>
          <div className={`${profile.paragraf} text text_type_main-default text_color_inactive`}>
            <p >В этом разделе вы можете изменить свои персональные данные</p>
          </div>
        </div>
      </>
    </>
  )
}
