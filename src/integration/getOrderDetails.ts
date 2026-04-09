import api from './baseIntegration'

import type { OrderResponse } from '@/utils/types'

export const getOrderDetails = async (
  orderId: string
): Promise<OrderResponse> => {
  try {
    const response = await api.get(`/orders/${orderId}`)
    return response.data as OrderResponse
  } catch (error) {
    console.error('Ошибка при запросе', error)
    return { success: false }
  }
}
