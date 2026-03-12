import { createSlice } from '@reduxjs/toolkit'

import { userAuth, userReg, userTokenRefresh } from './action'

import type { RootState } from '../store'

export type userTokensState = {
  accessToken: string
  refreshToken: string
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string
}

const initialState: userTokensState = {
  accessToken: '',
  refreshToken: '',
  status: 'idle',
  error: '',
}

const userTokensSlice = createSlice({
  name: 'userTokens',
  initialState,
  reducers: {
    clearTokens: (state) => {
      state.accessToken = ''
      state.refreshToken = ''
      state.status = 'idle'
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      //регистрация
      .addCase(userReg.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userReg.fulfilled, (state, action) => {
        state.status = 'success'
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(userReg.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
      //авторизация
      .addCase(userAuth.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.status = 'success'
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
      //обновление токена
      .addCase(userTokenRefresh.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userTokenRefresh.fulfilled, (state, action) => {
        state.status = 'success'
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(userTokenRefresh.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
  },
})

export default userTokensSlice.reducer

export const { clearTokens } = userTokensSlice.actions

export const getUserRefreshToken = (state: RootState): string =>
  state.userTokens.refreshToken
export const getUserAccessToken = (state: RootState): string =>
  state.userTokens.accessToken
export const getUserTokensStatus = (state: RootState): string =>
  state.userTokens.status
export const getUserTokensError = (state: RootState): string =>
  state.userTokens.error
