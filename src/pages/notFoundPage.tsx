import { FC } from 'react';
import style from '@ya.praktikum/react-developer-burger-ui-components';
import notFoundPage from './notFoundPage.module.css';

const NotFoundPage: FC = () => {

  return (
    <div className={notFoundPage.notFoundPage}>
      <h2 className='text text_type_main-medium'>Ошибка 404. Страница не найдена</h2>
    </div>
  )
}

export default NotFoundPage;
