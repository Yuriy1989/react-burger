
import { useState, useEffect, useCallback } from 'react';
import MenuProfile from '../components/menuProfile/MenuProfile';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionRequestPatchUser } from '../services/actions/actionsAuthorization';
import profile from './profile.module.css';
import { getCookie } from '../utils/cookie';
import Loader from '../components/loader/Loader';
import { useForm } from '../hooks/useForm';

export function Profile () {

  const {values, handleChange, setValues} = useForm({});
  const email = useSelector(state => state.authorization.user.email);
  const name = useSelector(state => state.authorization.user.name);
  const error = useSelector(state => state.authorization.error);
  const feedRequestPatchUser = useSelector(state => state.authorization.feedRequestPatchUser);
  // const [data, setData] = useState({name: '', email: '', password: '', buttonActive: false});
  const [button, setButton] = useState(false);
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  //Сбор данных из всех input
  // const onChange = (e) => {
  //   setData( { ...data, [e.target.name]: e.target.value, buttonActive: true} );
  // }

  //Обновление данных о пользователе, с сохранением их в Store
  const handleClickSave = useCallback(
    e => {
      e.preventDefault();
      setValues( { ...values} );
      setButton(true);
      dispatch(actionRequestPatchUser(values, accessToken));
    },
    [values]
  )

  //Отмена всех введеных ранее данных
  const handleClickCancel = useCallback(
    e => {
      e.preventDefault();
      setValues( {name: name, email: email, password: ''} );
      setButton(false);
    },
    [values]
  )

  useEffect( () => {
    setValues( {
      name: name ? name : '',
      email: email ? email : '',
      password: ''
    } );
    setButton(false);
  }, [ email, name ] )

  useEffect( (e) => {
    // setValues({...values, buttonActive: true});
    // setValues( {name: name, email: email, password: '', buttonActive: true} );
    // setButton(true);
  }, [])

  return (
    <>
      {feedRequestPatchUser && <Loader />}
      {!feedRequestPatchUser &&
        <div className={profile.profile}>
          <div className={profile.menuProfile}>
            <MenuProfile />
            <div className={`${profile.paragraf} text text_type_main-default text_color_inactive`}>
              <p >В этом разделе вы можете изменить свои персональные данные</p>
            </div>
          </div>
          <div className={profile.editForm}>
            <form name="profileForm" className={profile.form}>
              <div className={`${profile.input} ${profile.input_margin}`}>
                <Input
                  type={'text'}
                  placeholder={'имя'}
                  icon={'EditIcon'}
                  onChange={handleChange}
                  value={values.name ? values.name : ''}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                />
                <div className={profile.email}>
                  <EmailInput onChange={handleChange} value={values.email ? values.email : ''} placeholder={'имя'} name={'email'} />
                  {error && <p className={`input__error text_type_main-default`}>ошибка: {error} </p>}
                </div>
                <PasswordInput onChange={handleChange} value={values.password ? values.password : ''} name={'password'} />
              </div>
              <div className={profile.button}>
                <Button disabled={!button} onClick={handleClickSave} type="primary" size="medium">
                  Сохранить
                </Button>
                <Button disabled={!button} onClick={handleClickCancel} type="primary" size="medium">
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}
