import React, {useState, useEffect} from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import app from './app.module.css';
// import {data} from '../../utils/data.js';


export default function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  let [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    fetch(` ${url} `)
    .then(res => {
      return res.json()
    })
    .then(data => setIngredients(data.data))
    .catch(console.log);
  }

  useEffect(() => {
    getIngredients();
  }, []);

  // console.log("ingredients", ingredients);

  return (
    <main className={app.app}>
      <div className={app.header}>
        <AppHeader />
      </div>
      <div className={app.section}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </div>
    </main>
  );
}
