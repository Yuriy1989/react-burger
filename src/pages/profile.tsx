
import { FC, useEffect, useCallback } from 'react';
import MenuProfile from '../components/menuProfile/MenuProfile';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { actionRequestPatchUser } from '../services/actions/actionsAuthorization';
import profile from './profile.module.css';
import { getCookie } from '../utils/cookie';
import Loader from '../components/loader/Loader';
import { useForm } from '../hooks/useForm';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../services/store/hooks';

const Profile: FC = () => {

  const {values, setValues} = useForm({name: '', email: '', password: '', buttonActive: false});
  const email = useSelector(state => state.authorization.user.email);
  const name = useSelector(state => state.authorization.user.name);
  const error = useSelector(state => state.authorization.error);
  const feedRequestPatchUser = useSelector(state => state.authorization.feedRequestPatchUser);
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  //изменение данных в форме и статуса кнопок
  const onButtonActive = (event: { target: { value: string; name: string; }; }) => {
    const {value, name} = event.target;
    setValues( { ...values, [name]: value, buttonActive: true} );
  }

  //Обновление данных о пользователе, с сохранением их в Store
  const handleClickSave = useCallback(
    e => {
      e.preventDefault();
      setValues( { ...values, buttonActive: true} );
      dispatch(actionRequestPatchUser(values, accessToken));
    },
    [values]
  )

  //Отмена всех введеных ранее данных
  const handleClickCancel = useCallback(
    e => {
      e.preventDefault();
      setValues( {name: name, email: email, password: '', buttonActive: false} );
    },
    [values]
  )

  useEffect( () => {
    setValues( {
      name: name ? name : '',
      email: email ? email : '',
      password: '',
      buttonActive: false
    } );
  }, [ email, name ] )

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
            <form className={profile.form} onSubmit={handleClickSave}>
              <div className={`${profile.input} ${profile.input_margin}`}>
                <Input
                  type={'text'}
                  placeholder={'имя'}
                  icon={'EditIcon'}
                  onChange={onButtonActive}
                  value={`${values?.name}`}
                  name={'name'}
                  error={false}
                  errorText={'Ошибка'}
                  size={'default'}
                />
                <div className={profile.email}>
                  <EmailInput onChange={onButtonActive} value={`${values?.email}`} name={'email'} />
                  {error && <p className={`input__error text_type_main-default`}>ошибка: {error} </p>}
                </div>
                <PasswordInput onChange={onButtonActive} value={`${values?.password}`} name={'password'} />
              </div>
              <div className={profile.button}>
                <Button disabled={!values?.buttonActive} type="primary" size="medium">
                  Сохранить
                </Button>
                <Button disabled={!values?.buttonActive} onClick={handleClickCancel} type="primary" size="medium">
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

export default Profile;
