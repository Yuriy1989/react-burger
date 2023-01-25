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

export interface ICard {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  status : string,
  updatedAt: string,
  _id: string,
}
