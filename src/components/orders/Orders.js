
import { useSelector } from 'react-redux';
import style, { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orders from './orders.module.css';
import { useEffect } from 'react';

export default function Orders ( {card} ) {

  console.log('cards = ', card);
  const ingredientsData = useSelector((state) => state.getIngredientsApi.ingredientsGetApi);
  console.log('ingredientsData = ', ingredientsData);

  let cellOrder = 0;

  const cell = () => {
    card.ingredients.map(item => {
      let n = 0;

      ingredients.map(ingredient => {
        if (item[n] === ingredient.id) {
          cellOrder = cellOrder + ingredient.price;
        }
        n++;
      })
    })
  }

  console.log('card.ingredients.length', card.ingredients.length);
  const cell2 = () => {
    let n = 0;
    while(n <= card.ingredients.length) {
      console.log('n',card.ingredients[n]);
      ingredientsData.map(item => {
        console.log('ingredientsData.price', item.price);
        if (item.id === card.ingredients[n]) {
          cellOrder = cellOrder + ingredientsData.price;
        }
      })
      n++;
    }
  }

  console.log('cellOrder =', cellOrder);

  let todayDate = new Date();
  let currentTimeZoneOffsetInHours  = todayDate.getTimezoneOffset() / 60;

  useEffect(() => {
    cell2();
  }, [ingredientsData])

  return (
    <li className={orders.orders}>
        <div className={orders.numberOrder}>
          <h2 className={` ${orders.idOrder} text text_type_digits-default `}># {card.number}</h2>
          <p className={` text text_type_main-default text_color_inactive `}>Сегодня, {todayDate.getHours()}:{todayDate.getMinutes()} i-GMT{currentTimeZoneOffsetInHours}</p>
        </div>
        <p className={` ${orders.burgerName} text text_type_main-medium `}>{card.name}</p>
        <div className={orders.ingredients}>
          <ul className={orders.filling}>
            <li className={orders.filling}>
              <img></img>
            </li>
          </ul>
          <div className={orders.cellPrice}>
            <p className={`${orders.cell} text text_type_digits-medium`}>100</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
  )
}
