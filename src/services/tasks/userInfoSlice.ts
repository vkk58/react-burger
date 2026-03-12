import { createSlice } from '@reduxjs/toolkit'

import { checkUserAuthThunk, userAuth, userReg, userUpd } from './action'

import type { RootState } from '../store'
import type { UserInfo } from '@/utils/types'

export type UserInfoState = {
  userInfo: UserInfo | undefined | null
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string
}

const initialState: UserInfoState = {
  userInfo: null,
  status: 'idle',
  error: '',
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userInfo = null
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
        state.userInfo = action.payload.user
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
        state.userInfo = action.payload.user
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
      //обновление инфо
      .addCase(userUpd.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userUpd.fulfilled, (state, action) => {
        state.status = 'success'
        state.userInfo = action.payload
      })
      .addCase(userUpd.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
        state.status = 'success'
        state.userInfo = action.payload
      })
      .addCase(checkUserAuthThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
  },
})

export const { clearUserData } = userInfoSlice.actions

export default userInfoSlice.reducer

export const getUserInfo = (state: RootState): UserInfo | undefined | null =>
  state.userInfo.userInfo
export const getUserInfoStatus = (state: RootState): string =>
  state.userInfo.status
export const getUserInfoError = (state: RootState): string =>
  state.userInfo.error
