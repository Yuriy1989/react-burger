import { combineReducers } from 'redux';
import { cardsApi } from './cards';

export const rootReducers = combineReducers({
  cards: cardsApi
})
