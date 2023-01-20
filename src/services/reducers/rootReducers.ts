import { combineReducers } from 'redux';
import { getIngredientsApi } from './ingredients';
import { openInfoSelectedIngredient } from './selectedInredient';
import { getInfoOrderDetails } from './orderDetails';
import { authorization } from './authorizationData';
import { orders } from './orders';
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const rootReducers = combineReducers({
  getIngredientsApi: getIngredientsApi,
  getInfoSelectedIngredient: openInfoSelectedIngredient,
  getOrderDetails: getInfoOrderDetails,
  authorization: authorization,
  orders: orders
})

export type RootState = ReturnType<typeof rootReducers>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
