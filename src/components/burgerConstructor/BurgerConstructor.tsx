import React, { FC, useEffect, useCallback } from "react";
import style, { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { calcPrice, setSelectedId } from '../../services/actions/getOrderDetails';
import burgerConstructor from './burgerConstructor.module.css';
import { useDrop } from "react-dnd";
import { selectedIngredientsForBurgerAction } from '../../services/actions/ingredients';
import ElementBurger from '../elementBurger/ElementBurger';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../../services/store/hooks';

type TCallbackType = () => void;

const BurgerConstructor: FC = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const onDropHandler = (itemId: unknown) => dispatch(selectedIngredientsForBurgerAction(itemId));
  const isAuth = useSelector(state => state.authorization.isAuth);
  const location = useLocation();

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
    const calcPriceBun = selectedIngredients.bun.reduce((s, i ) => s += i.data.price, 0);
    const calcPriceOther = selectedIngredients.others.reduce((s, i ) => s += i.data.price, 0);
    const calcPrice = (calcPriceBun*2) + calcPriceOther;
    return calcPrice;
  }

  // Собираем все _id ингредиентов для отправки запроса на сервер
  const createOrder = () => {
    const setSelectedIdBun = (selectedIngredients.bun.map((key) => {return key.data.id}));
    const setSelectedIdOthers = (selectedIngredients.others.map((key) => {return key.data.id}));
    const setSelectedId = [...setSelectedIdBun, ...setSelectedIdOthers, ...setSelectedIdBun];
    return setSelectedId;
  };

  const selectedIngredients = useSelector(state => state.getIngredientsApi.ingredientForConstructor);
  const dataPrice = useSelector(state => state.getOrderDetails.price);

  useEffect(() => {
    dispatch(calcPrice(calculatePrice()));
    dispatch(setSelectedId(createOrder()));
  }, [selectedIngredients]);

  const openModalOrder = useCallback<TCallbackType>(() => {
      if (selectedIngredients.bun.length) {
        history.push({
          pathname: `/orderDetails`,
          state: { isOpenModalDetails: location }
        })
      } else {
        history.push({
          pathname: `/error`,
          state: { isOpenModalError: location }
        })
      }
    }, []
  )

  const handleClick = useCallback<TCallbackType>(() => {
      if(!isAuth) {
        history.replace({ pathname: '/login' });
      } else {
        openModalOrder();
      }
    }, []
  )

  return (
    <section ref={dropTarget} className={burgerConstructor.burgerConstructor} style={{border}}>
      {selectedIngredients?.bun[0]?.data.id &&
        <div className={burgerConstructor.bun}>
          {
            <ConstructorElement
              type="top"
              isLocked={true}
              text={` ${selectedIngredients.bun[0]?.data.name} (верх)`}
              price={selectedIngredients.bun[0]?.data.price}
              thumbnail={selectedIngredients.bun[0]?.data.image_mobile}
            />
          }
        </div>
      }
      <ul className={` ${burgerConstructor.list} ${burgerConstructor.ingredients} ` } >
        {
          selectedIngredients?.others?.map((item, index) => (
            <ElementBurger data={item.data} index={index} key={item.indexIngredient}/>
          ))
        }
      </ul>
      {selectedIngredients?.bun[0]?.data.id &&
        <div className={burgerConstructor.bun}>
          {
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={` ${selectedIngredients.bun[0]?.data.name} (низ)`}
              price={selectedIngredients.bun[0]?.data.price}
              thumbnail={selectedIngredients.bun[0]?.data.image_mobile}
            />
          }
        </div>
      }
      { dataPrice > 0 &&
        <div className={burgerConstructor.buttonOrder}>
          <p className="text text_type_digits-medium">{dataPrice}</p>
          <div className={`${burgerConstructor.cellPrice}`}>
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
