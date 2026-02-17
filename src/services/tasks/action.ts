import { getIngredients } from '@/integration/ingredients'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadIngredientList = createAsyncThunk(
  'loadIngredients',
  async () => {
    return getIngredients()
  }
)
