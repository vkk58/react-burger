import { getIngredients } from '@/integration/ingredients'
import { sendOrder } from '@/integration/sendOrder'
import { createAsyncThunk } from '@reduxjs/toolkit'

import type { TIngredient4BurgerConstructor } from '@/utils/types'

export const loadIngredientList = createAsyncThunk(
  'loadIngredients',
  async () => {
    return getIngredients()
  }
)

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderArray: TIngredient4BurgerConstructor[]) => {
    return sendOrder(orderArray)
  }
)
