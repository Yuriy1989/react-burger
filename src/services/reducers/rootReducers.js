import { combineReducers } from 'redux';
import { getIngredientsApi } from './ingredients';

export const rootReducers = combineReducers({
  getIngredientsApi: getIngredientsApi
})
