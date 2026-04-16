import { describe, it, expect } from 'vitest'

import createSocketReducer, {
  initialState,
  connect,
  disconnect,
  onOpen,
  onMessage,
  onError,
  onClose,
} from './createSocketSlice'

describe('Редьюсер сокета ленты заказов', () => {
  it('Получить начальное состояние', () => {
    const state = createSocketReducer(undefined, { type: 'unknown' })
    expect(state).toEqual(initialState)
  })

  it('connect', () => {
    const action = connect({ url: 'wss://test.com' })
    const state = createSocketReducer(initialState, action)

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
    expect(state.isConnected).toBe(false)
  })

  it('onOpen', () => {
    const state = createSocketReducer(
      { ...initialState, isLoading: true },
      onOpen()
    )

    expect(state.isLoading).toBe(false)
    expect(state.isConnected).toBe(true)
    expect(state.error).toBeNull()
  })

  it('onMessage', () => {
    const payload = {
      success: true,
      orders: [],
      total: 100,
      totalToday: 10,
    }
    const action = onMessage(payload)
    const state = createSocketReducer(initialState, action)

    expect(state.messages).toEqual(payload)
  })

  it('onError', () => {
    const errorPayload = 'Connection failed'
    const action = onError(errorPayload)
    const state = createSocketReducer(initialState, action)

    expect(state.error).toBe(errorPayload)
    expect(state.isLoading).toBe(false)
  })

  it('onClose', () => {
    const state = createSocketReducer(
      { ...initialState, isConnected: true, isLoading: true },
      onClose()
    )

    expect(state.isConnected).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('disconnect', () => {
    const state = createSocketReducer(
      {
        ...initialState,
        isConnected: true,
        messages: { success: true, orders: [], total: 10, totalToday: 1 },
        isLoading: true,
      },
      disconnect()
    )

    expect(state.isConnected).toBe(false)
    expect(state.messages).toBeNull()
    expect(state.isLoading).toBe(false)
  })
})
