// app/store.ts
import { configureStore } from '@reduxjs/toolkit'

import ingredientsReducer from './tasks/ingredientSlice'

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
