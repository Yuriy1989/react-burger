import PropTypes from 'prop-types';
import { shape } from 'prop-types';

export const ingredientTypes = shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired
});

export const dataTypes = PropTypes.arrayOf(
  ingredientTypes.isRequired
)

export const funcTypes = PropTypes.func

export const numberTypes = PropTypes.number

export const text = PropTypes.string

export const component = PropTypes.object
