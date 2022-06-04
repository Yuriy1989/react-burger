import React, { useState } from 'react';
import style, { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burgerIngredients.module.css'

export default function BurgerIngredients({ data }) {

	const hiddenElement = document.querySelector('.main');
	console.log(hiddenElement);

  const [current, setCurrent] = useState('bun');
  return (
    <section className={burgerIngredients.burgerIngredients}>
      <h2 className={` ${burgerIngredients.title} text text_type_main-large`}>Собери бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={burgerIngredients.ingredients}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'bun').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <li className={burgerIngredients.item}>
                  <img className={burgerIngredients.image} src={filteredType.image}></img>
                  <div className="burgerIngredients.counter">
                    <Counter count={1} size="default" />
                  </div>
                  <div className={burgerIngredients.price}>
                    <p className={` ${burgerIngredients.cost} text text_type_digits-default`}>{filteredType.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={` ${burgerIngredients.name} text text_type_main-default`}>{filteredType.name}</p>
                </li>
              </ul>
            ))
          }
        </div>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'sauce').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <li className={burgerIngredients.item}>
                  <img className={burgerIngredients.image} src={filteredType.image}></img>
                  <div className={burgerIngredients.price}>
                    <p className={` ${burgerIngredients.cost} text text_type_digits-default`}>{filteredType.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={` ${burgerIngredients.name} text text_type_main-default`}>{filteredType.name}</p>
                </li>
              </ul>
            ))
          }
        </div>
        <h2 className="text text_type_main-medium main">Начинка</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'main').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <li className={burgerIngredients.item}>
                  <img className={burgerIngredients.image} src={filteredType.image}></img>
                  <div className={burgerIngredients.price}>
                    <p className={` ${burgerIngredients.cost} text text_type_digits-default`}>{filteredType.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={` ${burgerIngredients.name} text text_type_main-default`}>{filteredType.name}</p>
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </section>
  );
}
