import { useAppSelector } from '@/hooks/socketHooks'
import { getUserInfo } from '@/services/tasks/userInfoSlice'

export const useAuth = (): boolean => {
  const userInfo = useAppSelector(getUserInfo)
  console.log('userInfo', userInfo)
  return userInfo !== null
}
