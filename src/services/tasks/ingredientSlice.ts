import { createSlice } from '@reduxjs/toolkit'

import { loadIngredientList } from './action'

import type { RootState } from '../store'
import type { TIngredient } from '@utils/types'

export type IngredientsState = {
  items: TIngredient[]
  status: string
  error: string
}

const initialState: IngredientsState = {
  items: [],
  status: 'idle',
  error: '',
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredientList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadIngredientList.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
      })
      .addCase(loadIngredientList.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Ошибка при получении'
      })
  },
})

export default ingredientsSlice.reducer

export const selectAllIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.items
export const selectIngredientsStatus = (state: RootState): string =>
  state.ingredients.status
export const selectIngredientsError = (state: RootState): string =>
  state.ingredients.error
