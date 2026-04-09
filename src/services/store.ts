import socketMiddleware from '@/integration/socketFeed'
import { configureStore } from '@reduxjs/toolkit'

import feedOrdersSocketSlice from './tasks/createSocketSlice'
import ingredientsReducer from './tasks/ingredientSlice'
import orderDetailsSlice from './tasks/orderDetailsSlice'
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
    feedOrdersSocketSlice: feedOrdersSocketSlice,
    orderDetailsSlice: orderDetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
