import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style, { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burgerIngredients.module.css';

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
  const handleClick = () => onOpenModal(data);

  return (
    <section className={burgerIngredients.burgerIngredients}>
      <h2 className={` ${burgerIngredients.title} text text_type_main-large`}>Собери бургер</h2>
      <div className={burgerIngredients.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={burgerIngredients.ingredients}>
        <h2 id="Булки" className="text text_type_main-medium test">Булки</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'bun').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <li className={burgerIngredients.item}>
                  <div className={burgerIngredients.counter}>
                    <img onClick={handleClick} className={burgerIngredients.image} src={filteredType.image}></img>
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
        <h2 id="Соусы" className="text text_type_main-medium">Соусы</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'sauce').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <li className={burgerIngredients.item}>
                  <img onClick={onOpenModal} className={burgerIngredients.image} src={filteredType.image}></img>
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
        <h2 id="Начинки" className="text text_type_main-medium">Начинка</h2>
        <div className={burgerIngredients.ingredient}>
          {
            data.filter(card => card.type == 'main').map(filteredType => (
              <ul className={burgerIngredients.card} key={filteredType._id}>
                <li className={burgerIngredients.item}>
                  <img onClick={onOpenModal} className={burgerIngredients.image} src={filteredType.image}></img>
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
    })
  )
}
