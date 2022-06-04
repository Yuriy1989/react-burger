import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import app from './app.module.css';
import {data} from '../../utils/data.js';

export default function App() {
  return (
    <>
      <main className={app.app}>
        <AppHeader />
          <div className={app.section}>
            <BurgerIngredients data = {data}/>
						<BurgerConstructor data = {data}/>
          </div>
      </main>
    </>
  );
}
