import { createSlice } from '@reduxjs/toolkit'

import { getOrderDetailsThunk } from './action'

import type { RootState } from '../store'
import type { OrderResponse, Orders } from '@/utils/types'

export type OrderDetailsState = {
  order: OrderResponse | null
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string
}

const initialState: OrderDetailsState = {
  order: null,
  status: 'idle',
  error: '',
}

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.order = null
      state.status = 'idle'
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetailsThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getOrderDetailsThunk.fulfilled, (state, action) => {
        state.status = 'success'
        state.order = action.payload
      })
      .addCase(getOrderDetailsThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
  },
})

export default orderDetailsSlice.reducer
export const { clearOrderDetails } = orderDetailsSlice.actions

export const getOrderDetailsSlice = (
  state: RootState
): Orders | undefined | null => state.orderDetailsSlice.order?.order
export const getOrderDetailsSliceStatus = (state: RootState): string =>
  state.orderDetailsSlice.status
export const getOrderDetailsSliceError = (state: RootState): string =>
  state.orderDetailsSlice.error
