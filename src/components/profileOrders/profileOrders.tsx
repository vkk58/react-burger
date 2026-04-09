import { useAppDispatch, useAppSelector } from '@/hooks/socketHooks'
import {
  connect,
  disconnect,
  selectIsConnected,
  selectIsLoading,
  selectOrders,
} from '@/services/tasks/createSocketSlice'
import { getUserAccessToken } from '@/services/tasks/userTokensSlice'
import { URL_SOCKET } from '@/utils/constants'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import FeedOrders from '../feedOrders/feedOrderts'

function ProfileOrders(): React.JSX.Element {
  const isLoading = useAppSelector(selectIsLoading)
  const isConnected = useAppSelector(selectIsConnected)
  const accessToken = useAppSelector(getUserAccessToken)
  const messages = useAppSelector(selectOrders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken && !isConnected) {
      dispatch(connect(`${URL_SOCKET}/orders?token=${accessToken}`))
    }
    return (): void => {
      dispatch(disconnect())
    }
  }, [accessToken, dispatch])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      <FeedOrders messages={messages} />
      <Outlet />
    </>
  )
}

export default ProfileOrders
