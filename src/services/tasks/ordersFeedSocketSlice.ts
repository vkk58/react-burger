import { createSlice } from '@reduxjs/toolkit'

import type { OrderSocketResponse } from '@/utils/types'
import type { PayloadAction } from '@reduxjs/toolkit'

type SocketState = {
  isConnected: boolean
  messages: OrderSocketResponse[]
  error: string | null
  isLoading: boolean
}

// Начальное состояние
const initialState: SocketState = {
  isConnected: false,
  messages: [],
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
      state.messages = []
      state.isLoading = false
    },
    sendMessage: (state, action: PayloadAction) => {
      state.isConnected = true
      state.messages.push(action.payload)
    },
    // Событийные редьюсеры
    onOpen: (state) => {
      state.isLoading = false
      state.isConnected = true
      state.error = null
    },
    onMessage: (state, action: PayloadAction) => {
      state.messages.push(action.payload)
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

// Экспортируем редьюсер (его мы позже подключим к store)
export default feedOrdersSocketSlice.reducer
