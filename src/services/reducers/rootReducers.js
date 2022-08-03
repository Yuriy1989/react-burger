import { combineReducers } from 'redux';
import { ingredientsApi } from './ingredients';

export const rootReducers = combineReducers({
  ingredients: ingredientsApi
})
