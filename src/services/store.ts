// app/store.ts
import { configureStore } from '@reduxjs/toolkit'

import ingredientsReducer from './tasks/ingredientSlice'
import ingredientsOrder from './tasks/orderSlice'
import orderNumber from './tasks/sendOrderSlice'
import userInfoSlice from './tasks/userInfoSlice'
import userTokens from './tasks/userTokensSlice'

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: ingredientsOrder,
    orderNumber: orderNumber,
    userInfo: userInfoSlice,
    userTokens: userTokens,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
