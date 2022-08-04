import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import style, { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import burgerIngredients from './burgerIngredients.module.css';
import IngredientItem from '../ingredientItem/IngredientItem';
import { funcTypes } from '../../utils/types';
// import { BurgerContext } from '../../services/appContext';

export default function BurgerIngredients({ onOpenModal }) {

  // const {ingredients} = useContext(BurgerContext);

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

  const ingredients = useSelector((state) => state.ingredientsGetApi);
  console.log("ingredients", ingredients);

  return (
    <section className={burgerIngredients.burgerIngredients}>
      <h2 className={` ${burgerIngredients.title} text text_type_main-large`}>Собери бургер</h2>
      <div className={burgerIngredients.tab}>
        <Tab value="bun"  onClick={scrollToBun}>Булки</Tab>
        <Tab value="sauce"  onClick={scrollToSauce}>Соусы</Tab>
        <Tab value="main" onClick={scrollToMain}>Начинка</Tab>
      </div>
      <div className={burgerIngredients.ingredients}>
        <h2 ref={bunRef} className="text text_type_main-medium test">Булки</h2>
        <div className={burgerIngredients.ingredient}>
          {/* {
            ingredients.filter(card => card.type == 'bun').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType.id}>
                <IngredientItem item={filteredType} onOpenModal={onOpenModal}/>
              </ul>
            ))
          } */}
        </div>
        <h2 ref={sauceRef} className="text text_type_main-medium">Соусы</h2>
        <div className={burgerIngredients.ingredient}>
          {/* {
            ingredients.filter(card => card.type == 'sauce').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType.id}>
                <IngredientItem item={filteredType} onOpenModal={onOpenModal}/>
              </ul>
            ))
          } */}
        </div>
        <h2 ref={mainRef} className="text text_type_main-medium">Начинка</h2>
        <div className={burgerIngredients.ingredient}>
          {/* {
            ingredients.filter(card => card.type == 'main').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType.id}>
                <IngredientItem item={filteredType} onOpenModal={onOpenModal}/>
              </ul>
            ))
          } */}
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onOpenModal: funcTypes.isRequired
}
