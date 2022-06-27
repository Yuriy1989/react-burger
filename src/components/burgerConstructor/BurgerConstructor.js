import React, { useContext, useState, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import style, { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burgerConstructor.module.css';
import { dataTypes, funcTypes } from '../../utils/types';
import { IngredientsContext } from '../../services/appContext';

export default function BurgerConstructor({ onOpenModal }) {

  const {selectedBun, selectedFilling , selectedId, setSelectedId} = useContext(IngredientsContext);
  
  const calcPrice = {price: 0}; //начальная цена за бургер
  //Высчитываем общую цену бургера
  const calculatePrice = (state, action) => {
    switch (action.type) {
      case 'price':
        const priceBun = selectedBun.price; //цена одной булочки
        const priceFilling = selectedFilling.reduce((s, i) => s += i.price, 0); //цена начинки
        const newPrice = priceBun * 2 + priceFilling; //общая цена
        return {price: newPrice};
      default: throw new Error();
    }
  };

  const [state, dispatch] = useReducer(calculatePrice, calcPrice);

  //Собираем все _id ингредиентов для отправки запроса на сервер
  const createOrder = () => {
    setSelectedId(([(selectedBun.id)].concat(selectedFilling.map((key) => { return key.id; }))).concat([(selectedBun.id)]));
  };

  useEffect (() => {
    dispatch({type: 'price'});
    createOrder();
  }, [selectedFilling, selectedBun]);

  return (
    <section className={burgerConstructor.burgerConstructor} >
      <div className={burgerConstructor.bun}>
        {
          <ConstructorElement
            key={selectedBun.id}
            type="top"
            isLocked={true}
            text={selectedBun.name}
            price={selectedBun.price}
            thumbnail={selectedBun.image_mobile}
          />
        }
      </div>
      <ul className={` ${burgerConstructor.list} ${burgerConstructor.ingredients} `}>
        {
          selectedFilling.map((item) => (
            <li className={burgerConstructor.ingredient} key={item.id}>
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
        {
          <ConstructorElement
            key={selectedBun.id}
            type="bottom"
            isLocked={true}
            text={selectedBun.name}
            price={selectedBun.price}
            thumbnail={selectedBun.image_mobile}
          />
        }
      </div>
      <div className={burgerConstructor.buttonOrder}>
        <p className="text text_type_digits-medium">{state.price}</p>
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
  onOpenModal: funcTypes.isRequired
}
