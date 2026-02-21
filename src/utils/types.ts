export type TIngredient = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_large: string
  image_mobile: string
  __v: number
}

export type TIngredient4BurgerConstructor = TIngredient & {
  idConstructor: string
}

export const IngredientItem = {
  INGREDIENT: 'ingredient',
}
