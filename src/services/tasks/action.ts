import { checkUserAuth } from '@/integration/checkUser'
import { getIngredients } from '@/integration/ingredients'
import { sendOrder } from '@/integration/sendOrder'
import {
  authUser,
  refreshUserTokens,
  userRegistration,
  userUpdateInfo,
  type UserAuthData,
  type UserRegistrationInfo,
} from '@/integration/userData'
import { createAsyncThunk } from '@reduxjs/toolkit'

import type { TIngredient4BurgerConstructor } from '@/utils/types'

export const loadIngredientList = createAsyncThunk(
  'loadIngredients',
  async () => {
    return getIngredients()
  }
)

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderArray: TIngredient4BurgerConstructor[]) => {
    return sendOrder(orderArray)
  }
)

export const userReg = createAsyncThunk(
  'userRegistration',
  async (userRegistrationInfo: UserRegistrationInfo) => {
    return userRegistration(userRegistrationInfo)
  }
)

export const userAuth = createAsyncThunk(
  'userAuth',
  async (userAuth: UserAuthData) => {
    return authUser(userAuth)
  }
)

export const userTokenRefresh = createAsyncThunk(
  'userTokenRefresh',
  async (token: string) => {
    return refreshUserTokens(token)
  }
)

export const userUpd = createAsyncThunk(
  'userUpdateInfo',
  async (userNewInfo: UserRegistrationInfo) => {
    return userUpdateInfo(userNewInfo)
  }
)

export const checkUserAuthThunk = createAsyncThunk(
  'checkUser',
  async (_, { rejectWithValue }) => {
    const result = await checkUserAuth()
    if (!result.success) {
      return rejectWithValue('Не удалось проверить авторизацию')
    }
    return result.user
  }
)
