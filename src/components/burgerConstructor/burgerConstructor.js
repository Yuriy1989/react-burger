import React from "react";
import style, { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burgerConstructor.module.css';

export default function BurgerConstructor({ data }) {
  return (
    <section className={burgerConstructor.burgerConstructor} >
      <div className={burgerConstructor.burgerConstructor__bun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <ul className={` ${burgerConstructor.burgerConstructor__list} ${burgerConstructor.burgerConstructor__ingredients} `}>
        {
          data.filter(card => card.type == 'sauce' || card.type == 'main').map((item) => (
            <li className={burgerConstructor.burgerConstructor__ingredient} key={item._id}>
              <div className={burgerConstructor.burgerConstructor__dragIcon}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </li>
          ))
        }
      </ul>
      <div className={burgerConstructor.burgerConstructor__bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <div className={burgerConstructor.buttonOrder}>
        <p className="text text_type_digits-medium">610</p>
        <div className={burgerConstructor.cellPrice}>
          <CurrencyIcon type="primary" className="p-4" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
