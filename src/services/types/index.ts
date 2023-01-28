import { ReactNode } from "react";

export let currentDefault: "bun" | "sauce" | "main";

export interface ICount {
  [key: string]: number
}

export interface IData {
  calories: number,
  carbohydrates: number,
  fat: number,
  id: string,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: typeof currentDefault,
}

export interface IArrayData {
  data: IData,
  indexIngredient: string,
}

export interface IAuth {
  email: string,
  password: string,
}

export interface IPatchUser {
  success: boolean,
  user: Omit<IAuth, "password"> & {name: string},
}

export interface ICard {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  status : string,
  updatedAt: string,
  _id: string,
}

export interface ICardData {
  orders: Array<ICard>,
  success: boolean,
}

export type TCard = {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  owner: string,
  status : string,
  updatedAt: string,
  __v: number,
  _id: string,
}

export type TOrderDetailAPI = {
  createdAt: string,
  ingredients: Array<Omit<IData, "id"> & { id: string, __v: number }>,
  name: string,
  number: number,
  owner: {
    createdAt: string,
    email: string,
    name: string,
    updatedAt: string,
  },
  price: number,
  status : string,
  updatedAt: string,
  _id: string,
}

export type TDetails = {
  orders: Array<TCard>,
  success: boolean,
}

export type TProtectedRouteProps= {
  children?: ReactNode,
  path: string,
  isAuth?: boolean,
  exact?: boolean,
}
