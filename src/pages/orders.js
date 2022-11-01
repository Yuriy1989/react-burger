
import style from '@ya.praktikum/react-developer-burger-ui-components';
import orders from './orders.module.css';
import MenuProfile from '../components/menuProfile/MenuProfile';
import CardOrder from '../components/cardOrder/CardOrder';

export function Orders () {
  return (
    <>
      <div className={orders.orders}>
        <div className={orders.menuProfile}>
          <MenuProfile />
        </div>
        <ul className={orders.cardOrder}>
          <CardOrder />
        </ul>
      </div>
    </>
  )
}
