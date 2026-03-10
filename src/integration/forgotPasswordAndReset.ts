import api from './baseIntegration'

import type { AxiosResponse } from 'axios'

type Response = {
  success: boolean
  message: string
}

export async function forgotPasswordAndReset(email: string): Promise<Response> {
  try {
    const response: AxiosResponse<Response> = await api.post(
      '/password-reset',
      {
        email: email,
      }
    )
    return response.data
  } catch (error) {
    alert(error)
    throw error
  }
}
