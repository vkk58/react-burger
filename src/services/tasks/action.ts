import { checkUserAuth } from '@/integration/checkUser'
import { getOrderDetails } from '@/integration/getOrderDetails'
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
import axios from 'axios'

import { clearUserData } from './userInfoSlice'
import { clearTokens, getUserAccessToken } from './userTokensSlice'

import type { RootState } from '../store'
import type { TIngredient4BurgerConstructor } from '@/utils/types'

export const loadIngredientList = createAsyncThunk(
  'loadIngredients',
  async () => {
    return getIngredients()
  }
)

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderArray: TIngredient4BurgerConstructor[], { getState }) => {
    const state = getState() as RootState
    const token = getUserAccessToken(state)
    return sendOrder(orderArray, token)
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
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const result = await checkUserAuth()
      return result.user
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const state = getState() as RootState
        const refreshToken = state.userTokens.refreshToken
        if (!refreshToken) {
          return rejectWithValue('Нет refresh токена')
        }
        try {
          await dispatch(userTokenRefresh(refreshToken)).unwrap()
          const retryResult = await checkUserAuth()
          return retryResult.user
        } catch (refreshError) {
          dispatch(clearTokens())
          dispatch(clearUserData())
          return rejectWithValue(refreshError)
        }
      }
      return rejectWithValue(error)
    }
  }
)

export const getOrderDetailsThunk = createAsyncThunk(
  'orderDetails',
  async (orderId: string) => {
    return getOrderDetails(orderId)
  }
)
