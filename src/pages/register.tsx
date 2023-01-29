
import { FC, useRef, useCallback, FormEvent } from 'react';
import style, { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import register from './register.module.css';
import { api } from '../utils/Api';
import { useForm } from '../hooks/useForm';

const Register: FC = () => {

  const {values, handleChange} = useForm({email: '', password: '', name: ''});
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory();

  //При успешной регистрации, делаем редирект на страницу атворизации
  const loginRequest = useCallback(() => {
    history.replace({ pathname: '/login' })
  },
    [history]
  );

  //Запрос к серверу для регистрации пользователя
  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.register(values)
      .then(res => {
        if(res.success === true) {
          loginRequest();
        }
      })
  }

  return (
    <div className={register.register}>
      <h2 className='text text_type_main-medium'>Регистрация</h2>
      <form className={register.form} onSubmit={handleClick}>
        <div className={`${register.input_margin}`}>
          <Input
            type={'text'}
            placeholder={'имя'}
            onChange={handleChange}
            value={`${values?.name}`}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={register.email}>
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
        <div className={register.button}>
          <Button type="primary" size="medium" >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={`${register.input} text text_type_main-default text_color_inactive`}>
        <p className={register.paragraf}>Уже зарегистрированы?</p>
        <Link className={register.link} to="/login">Войти</Link>
      </div>
    </div>
  )
}

export default Register;
