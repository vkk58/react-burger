import api from './baseIntegration'

import type { AxiosResponse } from 'axios'

type Response = {
  success: boolean
  message: string
}

export type ResetPasswordRequestBody = {
  password: string
  token: string
}

export async function resetPassword(
  body: ResetPasswordRequestBody
): Promise<Response> {
  try {
    const response: AxiosResponse<Response> = await api.post(
      '/password-reset/reset',
      {
        password: body.password,
        token: body.token,
      }
    )
    return response.data
  } catch (error) {
    alert(error)
    throw error
  }
}
