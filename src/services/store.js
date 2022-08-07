import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { applyMiddleware, compose } from 'redux';

import ingredientsSlice from './reducers/ingredients';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice
    // enhancer: enhancer,
  },
})

