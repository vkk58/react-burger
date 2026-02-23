import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import type { TIngredient4BurgerConstructor } from '@utils/types'

export type IngredientsState = {
  items: TIngredient4BurgerConstructor[]
  error: string
}

const initialState: IngredientsState = {
  items: [],
  error: '',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient2Order: (
      state,
      action: PayloadAction<TIngredient4BurgerConstructor>
    ) => {
      const item = action.payload
      const arrayLength = state.items.length
      state.error = ''
      if (arrayLength === 0 && item && item.type !== 'bun') {
        state.error = 'Сначала нужно добавить булки'
        return
      }

      if (arrayLength > 0 && item && item.type === 'bun') {
        state.items = state.items.filter((item) => item.type !== 'bun')
        state.items.unshift(item)
        state.items.push(item)
        return
      }

      if (arrayLength === 0 && item.type === 'bun') {
        state.items.push(item)
        state.items.push(item)
        return
      }

      if (arrayLength !== 0 && item.type !== 'bun') {
        state.items.splice(1, 0, item)
        return
      }
    },
    removeIngredientFromOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.idConstructor !== action.payload
      )
    },
    clearOrder: (state) => {
      state.items = []
    },
    sortOrder: (
      state,
      action: PayloadAction<TIngredient4BurgerConstructor[]>
    ) => {
      state.items = action.payload
    },
  },
})

export const currentOrder = (
  state: RootState
): TIngredient4BurgerConstructor[] => state.order.items

export const countIngredient = (state: RootState, id: string): number => {
  const order = currentOrder(state)
  let ret = 0
  if (order) {
    ret = order.filter((array) => array._id === id).length ?? 0
  }
  return ret
}

export const orderSum = (state: RootState): number => {
  const orderArray = currentOrder(state)
  return orderArray.reduce((sum, ingredient) => sum + ingredient.price, 0)
}

export const orderSliceError = (state: RootState): string => state.order.error

export const {
  addIngredient2Order,
  removeIngredientFromOrder,
  clearOrder,
  sortOrder,
} = orderSlice.actions

export default orderSlice.reducer
