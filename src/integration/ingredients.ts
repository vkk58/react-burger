import { URL_API } from '@/utils/constants'
import axios, { type AxiosResponse } from 'axios'

import type { TIngredient } from '@/utils/types'

type IngredientsResponse = {
  success: boolean
  data: TIngredient[]
}

const api = axios.create({
  baseURL: URL_API,
})

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
