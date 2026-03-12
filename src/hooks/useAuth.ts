import { getUserInfo } from '@/services/tasks/userInfoSlice'
import { useSelector } from 'react-redux'

export const useAuth = (): boolean => {
  const userInfo = useSelector(getUserInfo)
  return userInfo !== null
}
