import React, { useEffect, useMemo } from "react";
import style, { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { calcPrice, setSelectedId } from '../../services/actions/getOrderDetails';
import burgerConstructor from './burgerConstructor.module.css';
import { openOrderDetails, openOrderError } from '../../services/actions/getIngredientforOpenModal';
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

  //вычисляем общую цену за бургер
  const calculatePrice = () => {
    const calcPriceBun = selectedIngredients.bun.reduce((s, i ) => s += i.price, 0);
    const calcPriceOther = selectedIngredients.others.reduce((s, i ) => s += i.price, 0);
    const calcPrice = (calcPriceBun*2) + calcPriceOther;
    return calcPrice;
  }

  // Собираем все _id ингредиентов для отправки запроса на сервер
  const createOrder = () => {
    const setSelectedIdBun = (selectedIngredients.bun.map((key) => {return key.id}));
    const setSelectedIdOthers = (selectedIngredients.others.map((key) => {return key.id}));
    const setSelectedId = [...setSelectedIdBun, ...setSelectedIdOthers, ...setSelectedIdBun];
    return setSelectedId;
  };

  const selectedIngredients = useSelector(state => state.getIngredientsApi.ingredientForConstructor)
  const dataPrice = useSelector(state => state.getOrderDetails.price);
;
  useEffect(() => {
    dispatch(calcPrice(calculatePrice()));
    dispatch(setSelectedId(createOrder()));
  }, [selectedIngredients]);


  const handleClick = () => {
    if (selectedIngredients.bun.find(item => item.type === 'bun')) {
      dispatch(openOrderDetails());
    } else {
      dispatch(openOrderError());
    }
  }

  return (
    <section ref={dropTarget} className={burgerConstructor.burgerConstructor} style={{border}}>
      {selectedIngredients.bun[0]?.id &&
        <div className={burgerConstructor.bun}>
          {
            <ConstructorElement
              key={uuid()}
              type="top"
              isLocked={true}
              text={` ${selectedIngredients.bun[0]?.name} (верх)`}
              price={selectedIngredients.bun[0]?.price}
              thumbnail={selectedIngredients.bun[0]?.image_mobile}
            />
          }
        </div>
      }
      <ul className={` ${burgerConstructor.list} ${burgerConstructor.ingredients} ` } >
        {
          selectedIngredients.others.map((item, index) => (
            <ElementBurger data={item} index={index} key={uuid()}/>
          ))
        }
      </ul>
      {selectedIngredients.bun[0]?.id &&
        <div className={burgerConstructor.bun}>
          {
            <ConstructorElement
              key={uuid()}
              type="bottom"
              isLocked={true}
              text={` ${selectedIngredients.bun[0]?.name} (низ)`}
              price={selectedIngredients.bun[0]?.price}
              thumbnail={selectedIngredients.bun[0]?.image_mobile}
            />
          }
        </div>
      }
      { dataPrice > 0 &&
        <div className={burgerConstructor.buttonOrder}>
          <p className="text text_type_digits-medium">{dataPrice}</p>
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
