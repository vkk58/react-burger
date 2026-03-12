import api from '@/integration/baseIntegration'

import type { UserInfo, UserResponse, UserTokens } from '@/utils/types'
import type { AxiosResponse } from 'axios'

export type UserAuthData = {
  email: string
  password: string
}

export type UserRegistrationInfo = {
  email: string
  name: string
  password: string
}

export type UserAuthCheck = UserInfo & {
  success: boolean
}

export type UserLogout = {
  success: boolean
  message: string
}
const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

export async function authUser(
  userAuthData: UserAuthData
): Promise<UserResponse> {
  try {
    const response: AxiosResponse<UserResponse> = await api.post(
      '/auth/login',
      {
        email: userAuthData.email,
        password: userAuthData.password,
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function userRegistration(
  userRegistrationInfo: UserRegistrationInfo
): Promise<UserResponse> {
  try {
    const response: AxiosResponse<UserResponse> = await api.post(
      '/auth/register',
      {
        email: userRegistrationInfo.email,
        name: userRegistrationInfo.name,
        password: userRegistrationInfo.password,
      }
    )
    return response.data
  } catch (error) {
    alert(error)
    throw error
  }
}

export async function refreshUserTokens(token: string): Promise<UserTokens> {
  try {
    const response: AxiosResponse<UserTokens> = await api.post('/auth/token', {
      token: token,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function logoutUser(token: string): Promise<UserLogout> {
  try {
    const response: AxiosResponse<UserLogout> = await api.post('/auth/logout', {
      token: token,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function userUpdateInfo(
  userUpdateInfo: UserRegistrationInfo
): Promise<UserInfo> {
  const token = getAccessToken()
  try {
    const response: AxiosResponse<UserInfo> = await api.patch('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      email: userUpdateInfo.email,
      name: userUpdateInfo.name,
      password: userUpdateInfo.password,
    })
    return response.data
  } catch (error) {
    alert(error)
    throw error
  }
}
