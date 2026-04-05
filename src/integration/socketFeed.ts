import {
  onOpen,
  onMessage,
  onError,
  onClose,
} from '@/services/tasks/ordersFeedSocketSlice'
import { URL_SOCKET } from '@/utils/constants'

import type { OrderFeedSocketResponse } from '@/utils/types'
import type { Middleware, PayloadAction } from '@reduxjs/toolkit'

let ws: WebSocket | null = null

const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const { type } = action as PayloadAction

  if (type === 'socket/connect') {
    const { payload: token } = action as PayloadAction<string>
    console.log('token ; ', token)
    if (ws) {
      ws.close()
    }

    ws = new WebSocket(`${URL_SOCKET}orders?token=Bearer%20${token}`)

    ws.onopen = (): void => {
      store.dispatch(onOpen())
    }

    ws.onmessage = (event: MessageEvent<string>): void => {
      if (event.data === 'ping') {
        ws?.send('pong')
        return
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = JSON.parse(
          event.data
        ) as unknown as OrderFeedSocketResponse
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        store.dispatch(onMessage(data))
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        store.dispatch(
          onError(`Ошибка парсинга сообщения от сервера: ${errorMessage}`)
        )
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

  if (type === 'socket/sendMessage') {
    const { payload: message } = action as PayloadAction<unknown>
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    }
  }

  if (type === 'socket/disconnect') {
    if (ws) {
      ws.close()
      ws = null
    }
  }

  return next(action)
}

export default socketMiddleware
