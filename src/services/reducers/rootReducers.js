import { combineReducers } from 'redux';
import { getIngredientsApi } from './ingredients';
import { openInfoSelectedIngredient } from './selectedInredient';

export const rootReducers = combineReducers({
  getIngredientsApi: getIngredientsApi,
  getInfoSelectedIngredient: openInfoSelectedIngredient
})
