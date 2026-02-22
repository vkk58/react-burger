import api from './baseIntegration'

import type { TIngredient4BurgerConstructor } from '@/utils/types'
import type { AxiosResponse } from 'axios'

type Order = {
  number: number
}

type OrderResponse = {
  success: boolean
  name: string
  order: Order
}

export async function sendOrder(
  order: TIngredient4BurgerConstructor[]
): Promise<OrderResponse> {
  try {
    const idArray = order.map((item) => item._id)

    const response: AxiosResponse<OrderResponse> = await api.post('/orders', {
      ingredients: idArray,
    })
    return response.data
  } catch (error) {
    alert(error)
    throw error
  }
}
