import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { TIngredient4BurgerConstructor } from '@utils/types'

export type IngredientsState = {
  items: TIngredient4BurgerConstructor[]
}

const initialState: IngredientsState = {
  items: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient2Order: (
      state,
      action: PayloadAction<TIngredient4BurgerConstructor>
    ) => {
      state.items.push(action.payload)
    },
    removeIngredientFromOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.idConstructor !== action.payload
      )
    },
    clearOrder: (state) => {
      state.items = []
    },
  },
})

export const { addIngredient2Order, removeIngredientFromOrder, clearOrder } =
  orderSlice.actions
export default orderSlice.reducer
