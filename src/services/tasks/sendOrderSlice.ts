import { createSlice } from '@reduxjs/toolkit'

import { createOrder } from './action'

import type { RootState } from '../store'

export type SendOrderState = {
  orderNumber: number
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string
}

const initialState: SendOrderState = {
  orderNumber: 0,
  status: 'idle',
  error: '',
}

const sendOrderSlice = createSlice({
  name: 'sendOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'success'
        state.orderNumber = action.payload.order.number ?? 0
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
  },
})

export default sendOrderSlice.reducer

export const getOrderNumber = (state: RootState): number =>
  state.orderNumber.orderNumber
export const getOrderStatus = (state: RootState): string =>
  state.orderNumber.status
export const getOrderError = (state: RootState): string =>
  state.orderNumber.error
