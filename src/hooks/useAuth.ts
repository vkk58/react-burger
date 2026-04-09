import { useAppSelector } from '@/hooks/socketHooks'
import { getUserInfo, getUserInfoStatus } from '@/services/tasks/userInfoSlice'

type UseAuthResponseType = { isUserAuth: boolean; isLoading: boolean }

export const useAuth = (): UseAuthResponseType => {
  const userInfo = useAppSelector(getUserInfo)
  const status = useAppSelector(getUserInfoStatus)

  const isUserAuth = !!userInfo
  const isLoading = status === 'loading'

  return { isUserAuth, isLoading }
}
