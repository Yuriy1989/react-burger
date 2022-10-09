
import { useState, useRef } from 'react';
import style, { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthorizationApi } from '../services/actions/actionsAuthorization';
import register from './register.module.css';

export function Register () {

  const dispatch = useDispatch();

  const [data, setData] = useState({email: '', password: '', name: ''});
  const inputRef = useRef(null)

  const onChange = (e) => {
    setData( {...data, [e.target.name]: e.target.value} );
  }

  const handleClick = () => {
    dispatch(setAuthorizationApi(data));
  }

  return (
    <div className={register.register}>
      <h2 className='text text_type_main-medium'>Регистрация</h2>
      <div className={`${register.input_margin}`}>
        <Input
          type={'text'}
          placeholder={'имя'}
          onChange={onChange}
          value={data.name}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={register.email}>
        <EmailInput onChange={onChange} value={data.email} name={'email'} />
      </div>
        <PasswordInput onChange={onChange} value={data.password} name={'password'} />
      <div className={register.button}>
        <Button type="primary" size="medium" onClick={handleClick}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${register.input} text text_type_main-default text_color_inactive`}>
        <p className={register.paragraf}>Уже зарегистрированы?</p>
        <Link to="/login">Войти</Link>
      </div>
    </div>
  )
}
