import PropTypes from 'prop-types';
import style, { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import elementBurger from './elementBurger.module.css';
import { deleteSelectedIngredientsForBurgerAction } from '../../services/actions/ingredients';
import { ingredientTypes } from '../../utils/types';

function ElementBurger({item, index}) {

  const dispatch = useDispatch();

  const handleClose = () => dispatch(deleteSelectedIngredientsForBurgerAction(index));

  return (
    <li className={elementBurger.ingredient}>
      <div className={elementBurger.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={handleClose}
      />
    </li>
  )
}

export default ElementBurger;

ElementBurger.propTypes = {
  item: ingredientTypes.isRequired,
}
