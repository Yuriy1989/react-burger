import { combineReducers } from 'redux';
import { getIngredientsApi } from './ingredients';
import { openInfoSelectedIngredient } from './selectedInredient';
import { getInfoOrderDetails } from './orderDetails';
import { authorization } from './authorizationData';
import { orders } from './orders';
import { userOrders } from './userOrders';

export const rootReducers = combineReducers({
  getIngredientsApi: getIngredientsApi,
  getInfoSelectedIngredient: openInfoSelectedIngredient,
  getOrderDetails: getInfoOrderDetails,
  authorization: authorization,
  orders: orders,
  userOrders: userOrders
})
