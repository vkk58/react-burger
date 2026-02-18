// app/store.ts
import { configureStore } from '@reduxjs/toolkit'

import ingredientsReducer from './tasks/ingredientSlice'
import ingredientsOrder from './tasks/orderSlice'

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: ingredientsOrder,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
