import React, { useContext, useEffect, useMemo, useReducer } from "react";
import PropTypes from 'prop-types';
import style, { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { calcPrice, setSelectedId } from '../../services/actions/getOrderDetails';
import burgerConstructor from './burgerConstructor.module.css';
import { openOrderDetails } from '../../services/actions/getIngredientforOpenModal';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const selectedInrgedientsForBurgerConstructor = useSelector(state => state.getIngredientsApi.ingredientForConstructor);

  //вычисляем общую цену за бургер
  const calculatePrice = (data) => {
    const calcPrice = data.reduce((s, i ) => s += i.price, 0);
    return calcPrice;
  }

  // Собираем все _id ингредиентов для отправки запроса на сервер
  const createOrder = () => {
    const setSelectedId = (selectedInrgedientsForBurgerConstructor.map((key) => {return key.id}));
    return setSelectedId;
  };

  useEffect(() => {
    dispatch(calcPrice(calculatePrice(selectedInrgedientsForBurgerConstructor)));
    dispatch(setSelectedId(createOrder()));
  }, [selectedInrgedientsForBurgerConstructor]);

  const selectedIngredients = useSelector(state => state.getIngredientsApi.ingredientForConstructor)
  const dataPrice = useSelector(state => state.getOrderDetails.price);

  const selectedBun = useMemo(() => selectedIngredients.filter((item) => item.type == 'bun'), [selectedIngredients]);
  const selectedMain = useMemo(() => selectedIngredients.filter((item) => item.type !== 'bun'), [selectedIngredients]);

  const handleClick = () => dispatch(openOrderDetails());

  return (
    <section className={burgerConstructor.burgerConstructor} >
      <div className={burgerConstructor.bun}>
        {
          <ConstructorElement
            key={selectedBun[0]?.id}
            type="top"
            isLocked={true}
            text={selectedBun[0]?.name}
            price={selectedBun[0]?.price}
            thumbnail={selectedBun[0]?.image_mobile}
          />
        }
      </div>
      <ul className={` ${burgerConstructor.list} ${burgerConstructor.ingredients} `}>
        {
          selectedMain.map((item) => (
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
            key={selectedBun[0]?.id}
            type="bottom"
            isLocked={true}
            text={selectedBun[0]?.name}
            price={selectedBun[0]?.price}
            thumbnail={selectedBun[0]?.image_mobile}
          />
        }
      </div>
      <div className={burgerConstructor.buttonOrder}>
        <p className="text text_type_digits-medium">{dataPrice}</p>
        <div className={burgerConstructor.cellPrice}>
          <CurrencyIcon type="primary" className="p-4" />
        </div>
        <Button onClick={handleClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default React.memo(BurgerConstructor);
