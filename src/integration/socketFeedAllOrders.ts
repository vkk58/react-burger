import {
  onOpen,
  onMessage,
  onError,
  onClose,
} from '@/services/tasks/ordersFeedAllSocketSlice'
import { URL_SOCKET } from '@/utils/constants'

import type { OrdersAllSocketResponse } from '@/utils/types'
import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

let ws: WebSocket | null = null

const socketAllOrdersMiddleware: Middleware = (store) => (next) => (action) => {
  const { type } = action as PayloadAction

  if (type === 'socketOrderAll/connect') {
    if (
      ws &&
      (ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING)
    ) {
      console.log('socketOrderAll/connect')
      return next(action)
    }
    ws = new WebSocket(`${URL_SOCKET}/orders/all`)

    ws.onopen = (): void => {
      store.dispatch(onOpen())
    }

    ws.onmessage = (event: MessageEvent<string>): void => {
      try {
        if (event.data === 'ping') {
          ws?.send('pong')
          return
        }

        const data = JSON.parse(event.data) as OrdersAllSocketResponse
        if (data.success && Array.isArray(data.orders)) {
          store.dispatch(onMessage(data))
        } else {
          store.dispatch(onError())
        }
      } catch {
        store.dispatch(onError())
      }
    }
    ws.onerror = (): void => {
      store.dispatch(onError('Ошибка WebSocket-соединения'))
    }
    ws.onclose = (): void => {
      store.dispatch(onClose())
      ws = null
    }
  }
  if (type === 'socketOrderAll/disconnect') {
    console.log('wsClose')
    if (ws) {
      ws.close()
      ws = null
    }
  }

  return next(action)
}

export default socketAllOrdersMiddleware
