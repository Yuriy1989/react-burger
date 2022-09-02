import { combineReducers } from 'redux';
import { getIngredientsApi } from './ingredients';
import { openInfoSelectedIngredient } from './selectedInredient';
import { getInfoOrderDetails } from './orderDetails';

export const rootReducers = combineReducers({
  getIngredientsApi: getIngredientsApi,
  getInfoSelectedIngredient: openInfoSelectedIngredient,
  getOrderDetails: getInfoOrderDetails,
})
