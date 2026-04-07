import { getUserInfo } from '@/services/tasks/userInfoSlice'
import { useSelector } from 'react-redux'

export const useAuth = (): boolean => {
  const userInfo = useSelector(getUserInfo)
  console.log('userInfo', userInfo)
  return userInfo !== null
}
