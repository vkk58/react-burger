import { URL_API } from '@/utils/constants'
import axios, { type AxiosResponse } from 'axios'

import type { TIngredient4BurgerConstructor } from '@/utils/types'

type Order = {
  number: number
}

type OrderResponse = {
  success: boolean
  name: string
  order: Order
}

const api = axios.create({
  baseURL: URL_API,
})

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
