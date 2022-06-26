import React, { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import style, { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burgerConstructor.module.css';
import { dataTypes, funcTypes } from '../../utils/types';
import { IngredientsContext } from '../../services/appContext';

export default function BurgerConstructor({ onOpenModal }) {

  const {selectedBun, selectedFilling , selectedId, setSelectedId} = useContext(IngredientsContext);
  const [price, priceState] = useState();

  //Высчитываем общую цену бургера
  const calculatePrice = () => {
    // const priceBun = (selectedBun.reduce((s, i) => s += i.price, 0) * 2); //цена двух булочек
    // const priceBun = selectedBun.price;
    // console.log(selectedBun);
    // const priceFilling = selectedFilling.reduce((s, i) => s += i.price, 0); //цена начинки
    // const newPrice = priceBun + priceFilling;
    const newPriceW = 100;
    priceState(newPriceW);
  };

  //Собираем все _id ингредиентов для отправки запроса на сервер
    const createOrder = () => {
    // const createOrderId = (selectedBun.concat(selectedFilling)).concat(selectedBun).map((key) => { return key.id; });
    const createOrderId = selectedFilling.map((key) => { return key.id; });
    setSelectedId(createOrderId);
  };

  useEffect (() => {
    calculatePrice();
    createOrder();
  }, [selectedFilling, selectedBun]);

  return (
    <section className={burgerConstructor.burgerConstructor} >
      <div className={burgerConstructor.bun}>
        {/* {
          selectedBun.map((item) => (
            <ConstructorElement
              key={item.id}
              type="top"
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))
        } */}
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
        {/* {
          selectedBun.map((item) => (
            <ConstructorElement
              key={item.id}
              type="bottom"
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))
        } */}
      </div>
      <div className={burgerConstructor.buttonOrder}>
        <p className="text text_type_digits-medium">{price}</p>
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
