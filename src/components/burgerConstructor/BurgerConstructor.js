import React, { useContext } from "react";
import PropTypes from 'prop-types';
import style, { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burgerConstructor.module.css';
import { dataTypes, funcTypes } from '../../utils/types';
import { IngredientsContext } from '../../utils/appContext';

export default function BurgerConstructor({ onOpenModal }) {
  const data = useContext(IngredientsContext);
  const resultWithFind = data.find(item => item.type == 'bun');
  console.log(data);
  console.log("resultWithFind", resultWithFind);

  return (
    <section className={burgerConstructor.burgerConstructor} >
      <div className={burgerConstructor.bun}>
        {
          // <ConstructorElement
          //   type="top"
          //   isLocked={true}
          //   text={resultWithFind.name}
          //   price={resultWithFind.price}
          //   thumbnail={resultWithFind.image_mobile}
          // />
        }
        {/* <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        /> */}
      </div>
      <ul className={` ${burgerConstructor.list} ${burgerConstructor.ingredients} `}>
        {
          data.filter(card => card.type == 'sauce' || card.type == 'main').map((item) => (
            <li className={burgerConstructor.ingredient} key={item._id}>
              <div className={burgerConstructor.dragIcon}>
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
      <div className={burgerConstructor.bun}>
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
        <Button onClick={onOpenModal} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  // data: dataTypes.isRequired,
  onOpenModal: funcTypes.isRequired
}
