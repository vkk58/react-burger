import api from './baseIntegration'

export type User = {
  email: string
  name: string
}

export type AuthSuccessResponse = {
  success: true
  user: User
}

export type AuthErrorResponse = {
  success: false
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse

const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

export const checkUserAuth = async (): Promise<AuthResponse> => {
  const token = getAccessToken()

  if (!token) {
    return { success: false }
  }

  try {
    const response = await api.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data as AuthSuccessResponse
  } catch (error) {
    localStorage.removeItem('accessToken')
    console.error('Ошибка при проверке авторизации:', error)
    return { success: false }
  }
}
