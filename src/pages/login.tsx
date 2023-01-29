import style, { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import login from './login.module.css';
import { actionRequestAuth } from '../services/actions/actionsAuthorization';
import { useForm } from '../hooks/useForm';
import { FC } from 'react';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../services/store/hooks';

const Login: FC = () => {

  const {values, handleChange} = useForm({email: '', password: ''});
  const dispatch = useDispatch();

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(actionRequestAuth(values));
  }

  return (
    <div className={login.login}>
      <h2 className='text text_type_main-medium'>Вход</h2>
      <form className={login.form} onSubmit={handleClick}>
        <div className={login.email}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={`${values?.email}`}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <PasswordInput onChange={handleChange} value={`${values?.password}`} name={'password'} />
        <div className={login.button}>
          <Button type="primary" size="medium">
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

export default Login;
