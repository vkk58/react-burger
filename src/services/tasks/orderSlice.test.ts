import { ingredients } from '@/utils/ingredients'
import { describe, it, expect } from 'vitest'

import orderReducer, {
  addIngredient2Order,
  clearOrder,
  initialState,
  removeIngredientFromOrder,
  sortOrder,
} from './orderSlice'

const initialItems = {
  items: [
    { ...ingredients[0], idConstructor: 'qwe' },
    { ...ingredients[1], idConstructor: 'asd' },
    { ...ingredients[2], idConstructor: 'ddd' },
  ],
  error: '',
}

describe('Редьюсер ингредиентов в заказе', () => {
  it('Получить начальное состояние', () => {
    const initState = orderReducer(undefined, { type: 'unknown' })
    expect(initState).toEqual(initialState)
  })

  describe('Тест добавления ингредиента в заказ', () => {
    it('Добавить булку в заказ', () => {
      const ingredient4Order = { ...ingredients[0], idConstructor: 'qewre' }
      const action = addIngredient2Order(ingredient4Order)
      const newState = orderReducer(initialState, action)

      expect(newState.items).toEqual([ingredient4Order, ingredient4Order])
      expect(newState.error).toBe('')
    })

    it('Ошибка при добавлении в заказ первым ингредиентом не булку', () => {
      const ingredient4Order = { ...ingredients[1], idConstructor: 'qewre' }
      const action = addIngredient2Order(ingredient4Order)
      const newState = orderReducer(initialState, action)

      expect(newState.error).toBe('Сначала нужно добавить булки')
      expect(newState.items).toEqual([])
    })
  })

  it('Удалить ингредиент из заказа', () => {
    const action = removeIngredientFromOrder('asd')
    const newState = orderReducer(initialItems, action)

    expect(newState.items).toEqual([
      { ...ingredients[0], idConstructor: 'qwe' },
      { ...ingredients[2], idConstructor: 'ddd' },
    ])
  })

  it('Сортировка ингредиентов', () => {
    const sortItems = [
      { ...ingredients[0], idConstructor: 'qwe' },
      { ...ingredients[2], idConstructor: 'ddd' },
      { ...ingredients[1], idConstructor: 'asd' },
    ]
    const action = sortOrder(sortItems)
    const newState = orderReducer(initialItems, action)

    expect(newState.items).toEqual(sortItems)
    expect(newState.error).toEqual('')
  })

  it('Очистить заказ', () => {
    const action = clearOrder()
    const newState = orderReducer(initialState, action)

    expect(newState.items).toEqual([])
    expect(newState.error).toEqual('')
  })
})
