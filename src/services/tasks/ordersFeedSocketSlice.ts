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
const feedOrdersSocketSlice = createSlice({
  name: 'socket',
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
    // Событийные редьюсеры
    onOpen: (state) => {
      state.isLoading = false
      state.isConnected = true
      state.error = null
    },
    onMessage: (state, action: PayloadAction) => {
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
export const {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onMessage,
  onError,
  onClose,
} = feedOrdersSocketSlice.actions

export const selectIsConnectedForCurrentUser = (state: RootState): boolean =>
  state.feedOrdersSocketSlice.isConnected
export const selectIsLoadingForCurrentUser = (state: RootState): boolean =>
  state.feedOrdersSocketSlice.isLoading

export const selectOrdersForCurrentUser = (
  state: RootState
): OrdersAllSocketResponse => state.feedOrdersSocketSlice.messages

// Экспортируем редьюсер (его мы позже подключим к store)
export default feedOrdersSocketSlice.reducer
