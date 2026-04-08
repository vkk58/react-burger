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

const initialState: SocketState = {
  isConnected: false,
  messages: null,
  error: null,
  isLoading: false,
}

const feedOrdersSocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connect: (state, _action: PayloadAction<{ url: string }>) => {
      state.isLoading = true
      state.error = null
      console.log('_action', _action)
    },
    disconnect: (state) => {
      state.isConnected = false
      state.messages = null
      state.isLoading = false
    },
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

export const {
  connect,
  disconnect,
  sendMessage,
  onOpen,
  onMessage,
  onError,
  onClose,
} = feedOrdersSocketSlice.actions

export const selectIsConnected = (state: RootState): boolean =>
  state.feedOrdersSocketSlice.isConnected
export const selectIsLoading = (state: RootState): boolean =>
  state.feedOrdersSocketSlice.isLoading

export const selectOrders = (state: RootState): OrdersAllSocketResponse =>
  state.feedOrdersSocketSlice.messages

export default feedOrdersSocketSlice.reducer
