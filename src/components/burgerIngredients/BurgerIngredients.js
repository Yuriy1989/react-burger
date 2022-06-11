import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style, { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burgerIngredients.module.css';
import IngredientItem from '../ingredientItem/IngredientItem';

export default function BurgerIngredients({ data, onOpenModal }) {

  useEffect(() => {
    const smoothLinks = document.querySelectorAll('.noselect');
    for (let smoothLink of smoothLinks) {
      smoothLink.addEventListener("click", function () {
        const id = smoothLink.innerText;
        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }, [])

  const [current, setCurrent] = useState('bun');

  return (
    <section className={burgerIngredients.burgerIngredients}>
      <h2 className={` ${burgerIngredients.title} text text_type_main-large`}>Собери бургер</h2>
      <div className={burgerIngredients.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинка</Tab>
      </div>
      <div className={burgerIngredients.ingredients}>
        <h2 id="Булки" className="text text_type_main-medium test">Булки</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'bun').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <IngredientItem item={filteredType} onOpenModal={onOpenModal}/>
              </ul>
            ))
          }
        </div>
        <h2 id="Соусы" className="text text_type_main-medium">Соусы</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'sauce').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <IngredientItem item={filteredType} onOpenModal={onOpenModal}/>
              </ul>
            ))
          }
        </div>
        <h2 id="Начинка" className="text text_type_main-medium">Начинка</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'main').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                  <IngredientItem item={filteredType} onOpenModal={onOpenModal}/>
              </ul>
            ))
          }
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    })
  )
}
