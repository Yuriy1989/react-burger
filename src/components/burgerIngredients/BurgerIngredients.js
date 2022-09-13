import React, { useEffect, useRef } from 'react';
import style, { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import burgerIngredients from './burgerIngredients.module.css';
import IngredientItem from '../ingredientItem/IngredientItem';

function BurgerIngredients() {

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scrollToBun = () => {
    bunRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  const scrollToSauce = () => {
    sauceRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  const scrollToMain = () => {
    mainRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  useEffect(() => {
    if (bunRef.current) {
      scrollToBun();
    }
    if (sauceRef.current) {
      scrollToSauce();
    }
    if (mainRef.current) {
      scrollToMain();
    }
  }, []);

  const ingredients = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);

  return (
    <section className={burgerIngredients.burgerIngredients}>
      <h2 className={` ${burgerIngredients.title} text text_type_main-large`}>Собери бургер</h2>
      <div className={burgerIngredients.tab}>
        <Tab value="bun" onClick={scrollToBun}>Булки</Tab>
        <Tab value="sauce" onClick={scrollToSauce}>Соусы</Tab>
        <Tab value="main" onClick={scrollToMain}>Начинка</Tab>
      </div>
      <div className={burgerIngredients.ingredients}>
        <h2 ref={bunRef} className="text text_type_main-medium test">Булки</h2>
        <ul className={burgerIngredients.card}>
          {
            ingredients.filter(card => card.type == 'bun').map(filteredType => (
              <IngredientItem item={filteredType} key={filteredType.id} />
            ))
          }
        </ul>
        <h2 ref={sauceRef} className="text text_type_main-medium">Соусы</h2>
        <ul className={burgerIngredients.card}>
          {
            ingredients.filter(card => card.type == 'sauce').map(filteredType => (
              <IngredientItem item={filteredType} key={filteredType.id} />
            ))
          }
        </ul>
        <h2 ref={mainRef} className="text text_type_main-medium">Начинка</h2>
        <ul className={burgerIngredients.card} >
          {
            ingredients.filter(card => card.type == 'main').map(filteredType => (
              <IngredientItem item={filteredType} key={filteredType.id} />
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default React.memo(BurgerIngredients);
