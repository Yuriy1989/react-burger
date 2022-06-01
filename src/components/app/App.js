import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerConstructor/BurgerIngredients';
import app from './app.module.css';
import {data} from '../../utils/data.js';

export default function App() {
  return (
    <>
      <main className={app.app}>
        <AppHeader />
          <div className={app.app__section}>
            <BurgerIngredients data = {data}/>
						{/* <BurgerIngredients data = {data}/> */}
          </div>
      </main>
    </>
  );
}
