import { ingredients } from '@/utils/ingredients'
import { describe, it, expect } from 'vitest'

import { loadIngredientList } from './action'
import ingredientListReducer, { initialState } from './ingredientSlice'

describe('Редьюсер списка ингредиентов', () => {
  it('Получить начальное состояние', () => {
    const initState = ingredientListReducer(undefined, { type: 'unknown' })
    expect(initState).toEqual(initialState)
  })

  it('Pending', () => {
    const action = { type: loadIngredientList.pending.type }
    const state = ingredientListReducer(initialState, action)

    expect(state.status).toBe('loading')
    expect(state.error).toBe('')
  })

  it('Fulfilled', () => {
    const payload = [ingredients[0], ingredients[1], ingredients[2]]
    const action = {
      type: loadIngredientList.fulfilled.type,
      payload: payload,
    }

    const state = ingredientListReducer(initialState, action)

    expect(state.status).toBe('success')
    expect(state.items).toEqual(payload)
    expect(state.error).toBe('')
  })

  it('Rejected', () => {
    const action = {
      type: loadIngredientList.rejected.type,
      error: { message: 'Ошибка при получении' },
    }
    const state = ingredientListReducer(initialState, action)
    expect(state.status).toBe('error')
    expect(state.error).toBe('Ошибка при получении')
  })
})
