import { describe, it, expect } from 'vitest'

import { createOrder } from './action'
import sendOrderReducer, {
  initialState,
  resetOrderState,
} from './sendOrderSlice'

describe('Редьюсер созданного заказа', () => {
  it('Получить начальное состояние', () => {
    const initState = sendOrderReducer(undefined, { type: 'unknown' })
    expect(initState).toEqual(initialState)
  })

  it('Pending', () => {
    const action = { type: createOrder.pending.type }
    const state = sendOrderReducer(initialState, action)

    expect(state.status).toBe('loading')
    expect(state.error).toBe('')
  })

  it('Fulfilled', () => {
    const payload = { order: { number: 2345 } }
    const action = {
      type: createOrder.fulfilled.type,
      payload: payload,
    }
    const state = sendOrderReducer(initialState, action)

    expect(state.status).toBe('success')
    expect(state.orderNumber).toBe(2345)
    expect(state.error).toBe('')
  })

  it('Rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка регистрации' },
    }
    const state = sendOrderReducer(initialState, action)
    expect(state.status).toBe('error')
    expect(state.error).toBe('Ошибка регистрации')
  })

  it('Сброс редьюсера', () => {
    const action = resetOrderState()
    const newState = sendOrderReducer(initialState, action)

    expect(newState).toEqual({
      orderNumber: 0,
      status: 'idle',
      error: '',
    })
  })
})
