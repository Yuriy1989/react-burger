import React, { useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import style, { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { calcPrice, setSelectedId } from '../../services/actions/getOrderDetails';
import burgerConstructor from './burgerConstructor.module.css';
import { openOrderDetails } from '../../services/actions/getIngredientforOpenModal';
import { useDrop } from "react-dnd";
import { selectedIngredientsForBurgerAction } from '../../services/actions/ingredients';
import ElementBurger from '../elementBurger/ElementBurger';

function BurgerConstructor() {

  const dispatch = useDispatch();
  const onDropHandler = (itemId) => dispatch(selectedIngredientsForBurgerAction(itemId));

  const [ {isHover}, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  //подсвечиваем область для добавления ингредиентов
  const border = isHover ? 'lightgreen dashed 1px' : 'transparent';
  const selectedInrgedientsForBurgerConstructor = useSelector(state => state.getIngredientsApi.ingredientForConstructor);

  //вычисляем общую цену за бургер
  const calculatePrice = (data) => {
    const calcPriceBun = (data.filter(item => (item.type == 'bun'))).reduce((s, i ) => s += i.price, 0);
    const calcPriceOther = (data.filter(item => (item.type !== 'bun'))).reduce((s, i ) => s += i.price, 0);
    const calcPrice = (calcPriceBun*2) + calcPriceOther;
    return calcPrice;
  }

  // Собираем все _id ингредиентов для отправки запроса на сервер
  const createOrder = () => {
    const setSelectedId = (selectedInrgedientsForBurgerConstructor.map((key) => {return key.id}));
    return setSelectedId;
  };

  useEffect(() => {
    // dispatch(calcPrice(calculatePrice(selectedInrgedientsForBurgerConstructor)));
    // dispatch(setSelectedId(createOrder()));
  }, [selectedInrgedientsForBurgerConstructor]);

  const selectedIngredients = useSelector(state => state.getIngredientsApi.ingredientForConstructor)
  const dataPrice = useSelector(state => state.getOrderDetails.price);
  console.log('selectedIngredients others', selectedIngredients.others);
  console.log('selectedIngredients bun', selectedIngredients.bun);

  const selectedBun = [];
  // const selectedBun = useMemo(() => selectedIngredients.filter((item) => item.type == 'bun'), [selectedIngredients]);
  // const selectedMain = useMemo(() => selectedIngredients.filter((item) => item.type !== 'bun'), [selectedIngredients]);

  const handleClick = () => dispatch(openOrderDetails());

  return (
    <section ref={dropTarget} className={burgerConstructor.burgerConstructor} style={{border}}>
      {selectedBun[0]?.id &&
        <div className={burgerConstructor.bun}>
          {
            <ConstructorElement
              key={uuid()}
              type="top"
              isLocked={true}
              text={selectedBun[0]?.name}
              price={selectedBun[0]?.price}
              thumbnail={selectedBun[0]?.image_mobile}
            />
          }
        </div>
      }
      <ul className={` ${burgerConstructor.list} ${burgerConstructor.ingredients} `}>
        {
          // useMemo(() => selectedIngredients.filter((item) => item.type !== 'bun'), [selectedIngredients]).map((item, index) => (
          //   <ElementBurger item={item} index={index} key={uuid()}/>
          // ))
          // selectedMain.map((item, index) => (
          //   <ElementBurger item={item} index={index} key={uuid()}/>
          // ))
        }
      </ul>
      {selectedBun[0]?.id &&
        <div className={burgerConstructor.bun}>
          {
            <ConstructorElement
              key={uuid()}
              type="bottom"
              isLocked={true}
              text={selectedBun[0]?.name}
              price={selectedBun[0]?.price}
              thumbnail={selectedBun[0]?.image_mobile}
            />
          }
        </div>
      }
      { dataPrice > 0 &&
        <div className={burgerConstructor.buttonOrder}>
          {/* <p className="text text_type_digits-medium">{dataPrice}</p> */}
          <div className={burgerConstructor.cellPrice}>
            <CurrencyIcon type="primary" className="p-4" />
          </div>
          <Button onClick={handleClick} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      }
    </section>
  );
}

export default React.memo(BurgerConstructor);
