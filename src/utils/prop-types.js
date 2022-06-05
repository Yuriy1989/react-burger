import PropTypes from 'prop-types';

export const ingredientPropType = PropsTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

export const defaultIngredientPropType = defaultProps.shape({
  _id: 1,
  name: "Хлеб",
  type: PropTypes.oneOf(["bun"]).isRequired,
  proteins: 100,
  fat: 100,
  carbohydrates: 100,
  calories: 100,
  price: 10,
  image: "https://stella70.ru/wp-content/uploads/2019/09/Kak-bystro-i-vkusno-ispech-hleb-v-duhovke.jpg",
  image_mobile: "https://stella70.ru/wp-content/uploads/2019/09/Kak-bystro-i-vkusno-ispech-hleb-v-duhovke.jpg",
  image_large: "https://stella70.ru/wp-content/uploads/2019/09/Kak-bystro-i-vkusno-ispech-hleb-v-duhovke.jpg",
});
