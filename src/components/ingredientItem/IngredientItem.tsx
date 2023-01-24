import React, { FC, useEffect, useState } from 'react';
import style, { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector as useSelector } from '../../services/store/hooks';
import ingredientItem from './ingredientItem.module.css';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { IArrayData, IData } from '../../services/types';

interface ICount {
  [key: string]: number
}

const IngredientItem: FC<{ item: IData }> = ({ item }) => {
  const [count, setCount] = useState<ICount>({}); //объект типа {ID:количество} в массиве arrayData
  const [arrayData, setArrayData] = useState<Array<IArrayData>>([]); //общий массив всех ингредиентов
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const countData = useSelector(state => state.getIngredientsApi.ingredientForConstructor);

  //результат подсчета кол-ва элементов отобранных для бургера
  const caclCount = () => {
    let arrayCountData:Array<IArrayData> = [];
    let result:ICount = {};
    setCount(result);
    arrayCountData = ([...Object.values(countData)[0], ...Object.values(countData)[1]]);
    setArrayData(arrayCountData);
    for (let i = 0; i < arrayCountData.length; ++i) {
      let a = arrayCountData[i].data.id;
      if (result[a] != undefined) {
        ++result[a];
      }
      else
        result[a] = 1;
    }
  }

  useEffect(() => {
    caclCount();
  }, [countData]);

  return (
    <>
      {!isDrag &&
        <Link className={ingredientItem.link}
          to={{
            pathname: `/ingredients/${item.id}`,
            state: { isOpenModalIngredient: location }
          }}
        >
          <li ref={dragRef} className={ingredientItem.item}>
            <img className={ingredientItem.image} src={item.image}></img>
            <div className={ingredientItem.counter}>
              {arrayData.map((check, index) => (check.data.id === item.id &&
                <Counter key={index} count={count[item.id]} size="default" />))
              }
            </div>
            <div className={ingredientItem.price}>
              <p className={` ${ingredientItem.cost} text text_type_digits-default`}>{item.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className={` ${ingredientItem.name} text text_type_main-default`}>{item.name}</p>
          </li>
        </Link>
      }
    </>
  );
}

export default IngredientItem;
