import { ingredients } from '@/utils/ingredients'
import { describe, it, expect } from 'vitest'

import { getOrderDetailsThunk } from './action'
import orderDetailsReducer, {
  clearOrderDetails,
  initialState,
} from './orderDetailsSlice'

import type { OrderResponse } from '@/utils/types'

describe('Редьюсер детали заказа', () => {
  it('Получить начальное состояние', () => {
    const initState = orderDetailsReducer(undefined, { type: 'unknown' })
    expect(initState).toEqual(initialState)
  })

  it('Pending', () => {
    const action = { type: getOrderDetailsThunk.pending.type }
    const state = orderDetailsReducer(initialState, action)

    expect(state.status).toBe('loading')
    expect(state.error).toBe('')
  })

  it('Fulfilled', () => {
    const payload = {
      order: {
        ingredients: [ingredients[0]._id, ingredients[1]._id],
        _id: '324',
        status: 'done',
        number: 2243,
        name: 543,
        createdAt: 'test data',
        updatedAt: 'test data',
      },
    } as OrderResponse
    const action = {
      type: getOrderDetailsThunk.fulfilled.type,
      payload: payload,
    }
    const state = orderDetailsReducer(initialState, action)

    expect(state.status).toBe('success')
    expect(state.order).toEqual(payload)
    expect(state.error).toBe('')
  })

  it('Rejected', () => {
    const action = {
      type: getOrderDetailsThunk.rejected.type,
      error: { message: 'Ошибка при получении' },
    }
    const state = orderDetailsReducer(initialState, action)
    expect(state.status).toBe('error')
    expect(state.error).toBe('Ошибка при получении')
  })

  it('Сброс редьюсера', () => {
    const action = clearOrderDetails()
    const newState = orderDetailsReducer(initialState, action)

    expect(newState).toEqual({
      order: null,
      status: 'idle',
      error: '',
    })
  })
})
