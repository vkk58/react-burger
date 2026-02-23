import api from './baseIntegration'

import type { TIngredient } from '@/utils/types'
import type { AxiosResponse } from 'axios'

type IngredientsResponse = {
  success: boolean
  data: TIngredient[]
}

export async function getIngredients(): Promise<TIngredient[]> {
  try {
    const response: AxiosResponse<IngredientsResponse> =
      await api.get('/ingredients')
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
