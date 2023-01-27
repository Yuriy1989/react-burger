import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import style, { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector as useSelector } from '../../services/store/hooks';
import { ingredientsName } from '../../services/reducers/ingredients';
import burgerIngredients from './burgerIngredients.module.css';
import IngredientItem from '../ingredientItem/IngredientItem';
import { currentDefault } from '../../services/types';

const BurgerIngredients: FC = () => {

  const [current, setCurrent] = useState<typeof currentDefault>();
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const ingredients = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);

  //функция подсчета координат для выделения табов
  const scrollTab = useCallback(() => {
    const area: Element | null = document.querySelector('#scrollArea');
    const sectionBun: Element | null = document.querySelector('#sectionBun');
    const sectionSauce: Element | null = document.querySelector('#sectionSauce');
    const sectionMain: Element | null = document.querySelector('#sectionMain');

    if (area && sectionBun && sectionSauce && sectionMain) {
      const scrollArea = (area.getBoundingClientRect()).top;
      const scrollSectionBun = (sectionBun.getBoundingClientRect()).top;
      const scrollSectionSauce = (sectionSauce.getBoundingClientRect()).top;
      const scrollSectionMain = (sectionMain.getBoundingClientRect()).top;

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
    }
  }, [])

  function throttle(callee: { (): void; (args: any): void; }, timeout: number | undefined) {
    let timer: number | NodeJS.Timeout | null = null;
    return function perform(...args: any[]) {
      timer = setTimeout(() => {
        callee(...args)
        if (timer) {
          clearTimeout(timer)
        }
        timer = null
      }, timeout)
    }
  }

  let scrollTabThrottle = throttle(scrollTab, 500);

  const scrollToBun = () => {
    if(bunRef.current) {
      bunRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  const scrollToSauce = () => {
    if (sauceRef.current) {
      sauceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
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
    const scrollBlock: Element | null = document.getElementById("scrollArea");
    if(scrollBlock) {
      scrollBlock.addEventListener("scroll", scrollTabThrottle);
      return function removeScroll() {
        scrollBlock.removeEventListener("scroll", scrollTabThrottle);
      };
    }
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
