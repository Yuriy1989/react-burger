import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import style, { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import { useSelector } from 'react-redux';
import { useAppSelector as useSelector } from '../../services/store/hooks';
import { ingredientsName } from '../../services/reducers/ingredients';

import burgerIngredients from './burgerIngredients.module.css';
import IngredientItem from '../ingredientItem/IngredientItem';
import { number } from 'prop-types';

let currentDefault: "bun" | "sauce" | "main";

const BurgerIngredients: FC = () => {

  const [current, setCurrent] = useState<typeof currentDefault>();
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const ingredients = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);

  //функция подсчета координат для выделения табов
  const scrollTab = useCallback(() => {
    const scrollArea = (document.querySelector('#scrollArea').getBoundingClientRect()).top;
    const scrollSectionBun = (document.querySelector('#sectionBun').getBoundingClientRect()).top;
    const scrollSectionSauce = (document.querySelector('#sectionSauce').getBoundingClientRect()).top;
    const scrollSectionMain = (document.querySelector('#sectionMain').getBoundingClientRect()).top;

    const bun = Math.abs(scrollArea - scrollSectionBun);
    const sauce = Math.abs(scrollArea - scrollSectionSauce);
    const main = Math.abs(scrollArea - scrollSectionMain);

    if(bun < sauce) {
      setCurrent('bun');
    } else if (sauce < main) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  }, [])

  function throttle(callee: { (): void; (arg0: any): void; }, timeout: number | undefined) {
    let timer: string | number | NodeJS.Timeout | null | undefined = null
    return function perform(...args: any[]) {
      if (timer) return
      timer = setTimeout(() => {
        callee(...args)
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }


  let scrollTabThrottle = throttle(scrollTab, 500);

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
    const scrollBlock = document.getElementById("scrollArea");
    scrollBlock.addEventListener("scroll", scrollTabThrottle);
    return function removeScroll() {
      scrollBlock.removeEventListener("scroll", scrollTabThrottle);
    };
  }, []);

  return (
    <section className={burgerIngredients.burgerIngredients} >
      <h2 className={` ${burgerIngredients.title} text text_type_main-large`}>Собери бургер</h2>
      <div className={burgerIngredients.tab}>
        <Tab value="bun" active={current === ingredientsName.bun} onClick={scrollToBun}>Булки</Tab>
        <Tab value="sauce" active={current === ingredientsName.sauce} onClick={scrollToSauce}>Соусы</Tab>
        <Tab value="main" active={current === ingredientsName.main} onClick={scrollToMain}>Начинка</Tab>
      </div>
      <div className={burgerIngredients.ingredients} id='scrollArea'>
        <h2 ref={bunRef} className="text text_type_main-medium test" id='sectionBun'>Булки</h2>
        <ul className={` ${burgerIngredients.card} ingredients`}>
          {
            ingredients.filter(card => card.type === ingredientsName.bun).map(filteredType => (
              <IngredientItem item={filteredType} key={filteredType.id} />
            ))
          }
        </ul>
        <h2 ref={sauceRef} className="text text_type_main-medium" id='sectionSauce'>Соусы</h2>
        <ul className={` ${burgerIngredients.card} ingredients `} >
          {
            ingredients.filter(card => card.type === ingredientsName.sauce).map(filteredType => (
              <IngredientItem item={filteredType} key={filteredType.id} />
            ))
          }
        </ul>
        <h2 ref={mainRef} className="text text_type_main-medium" id='sectionMain'>Начинка</h2>
        <ul className={` ${burgerIngredients.card} ingredients `} >
          {
            ingredients.filter(card => card.type === ingredientsName.main).map(filteredType => (
              <IngredientItem item={filteredType} key={filteredType.id} />
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default React.memo(BurgerIngredients);
