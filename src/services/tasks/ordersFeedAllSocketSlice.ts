import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import type { OrdersAllSocketResponse } from '@/utils/types'
import type { PayloadAction } from '@reduxjs/toolkit'

type SocketState = {
  isConnected: boolean
  messages: OrdersAllSocketResponse | null
  error: string | null
  isLoading: boolean
}

// Начальное состояние
const initialState: SocketState = {
  isConnected: false,
  messages: null,
  error: null,
  isLoading: false,
}

// Создаём слайс
const feedOrdersAllSocketSlice = createSlice({
  name: 'socketOrderAll',
  initialState,
  reducers: {
    connect: (state) => {
      state.isLoading = true
      state.error = null
    },
    disconnect: (state) => {
      state.isConnected = false
      state.messages = null
      state.isLoading = false
    },
    onOpen: (state) => {
      state.isLoading = false
      state.isConnected = true
      state.error = ''
    },
    onMessage: (state, action: PayloadAction<OrdersAllSocketResponse>) => {
      state.messages = action.payload
    },
    onError: (state, action: PayloadAction) => {
      state.error = action.payload ?? ''
      state.isLoading = false
    },
    onClose: (state) => {
      state.isConnected = false
      state.isLoading = false
    },
  },
})

// Экспортируем экшены
export const { connect, disconnect, onOpen, onMessage, onError, onClose } =
  feedOrdersAllSocketSlice.actions

export const selectIsConnected = (state: RootState): boolean =>
  state.feedOrdersAllSocketSlice.isConnected
export const selectIsLoading = (state: RootState): boolean =>
  state.feedOrdersAllSocketSlice.isLoading

export const selectAllOrders = (state: RootState): OrdersAllSocketResponse =>
  state.feedOrdersAllSocketSlice.messages

// Экспортируем редьюсер (его мы позже подключим к store)
export default feedOrdersAllSocketSlice.reducer
