import socketMiddleware from '@/integration/socketFeed'
import socketAllOrdersMiddleware from '@/integration/socketFeedAllOrders'
import { configureStore } from '@reduxjs/toolkit'

import ingredientsReducer from './tasks/ingredientSlice'
import feedOrdersAllSocketSlice from './tasks/ordersFeedAllSocketSlice'
import feedOrdersSocketSlice from './tasks/ordersFeedSocketSlice'
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
    feedOrdersAllSocketSlice: feedOrdersAllSocketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware, socketAllOrdersMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
