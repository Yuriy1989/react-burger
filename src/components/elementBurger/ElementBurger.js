import PropTypes from 'prop-types';
import style, { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import elementBurger from './elementBurger.module.css';
import { deleteSelectedIngredientsForBurgerAction, sortSelectedIngredientsForBurgerAction } from '../../services/actions/ingredients';
import { ingredientTypes, numberTypes } from '../../utils/types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, useCallback } from 'react';

function ElementBurger({data, index}) {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => dispatch(deleteSelectedIngredientsForBurgerAction(index)), []);
  const onDropHandlerOthers = useCallback((dragIndex, hoverIndex) => dispatch(sortSelectedIngredientsForBurgerAction(dragIndex, hoverIndex)), []);

  const id = data.id;
  const ref = useRef();

  const [ {handlerId}, drop] = useDrop({
    accept: 'sortIngredients',
    collect: monitor => ({
      handlerId: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onDropHandlerOthers(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'sortIngredients',
    item: () => {
      return { id, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  const border = handlerId ? 'lightgreen dashed 1px' : 'transparent';

  drag(drop(ref))
  return (
    <li ref={ref} className={elementBurger.ingredient} style={{ border, opacity}} data-handler-id={handlerId}>
      <div className={elementBurger.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image_mobile}
        handleClose={handleClose}
      />
    </li>
  )
}

export default ElementBurger;

ElementBurger.propTypes = {
  data: ingredientTypes.isRequired,
  index: numberTypes.isRequired
}
