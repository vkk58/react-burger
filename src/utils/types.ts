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

export type UserInfo = {
  email: string
  name: string
}

export type UserTokens = {
  success: boolean
  accessToken: string
  refreshToken: string
}

export type UserResponse = {
  success: boolean
  user: UserInfo
  accessToken: string
  refreshToken: string
}
