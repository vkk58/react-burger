import { useAppDispatch, useAppSelector } from '@/hooks/socketHooks'
import {
  connect,
  selectIsConnectedForCurrentUser,
  selectIsLoadingForCurrentUser,
  selectOrdersForCurrentUser,
} from '@/services/tasks/ordersFeedSocketSlice'
import { getUserAccessToken } from '@/services/tasks/userTokensSlice'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import FeedOrders from '../feedOrders/feedOrderts'

function ProfileOrders(): React.JSX.Element {
  const isLoading = useAppSelector(selectIsLoadingForCurrentUser)
  const isConnected = useAppSelector(selectIsConnectedForCurrentUser)
  const accessToken = useSelector(getUserAccessToken)
  const messages = useAppSelector(selectOrdersForCurrentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken && !isConnected) {
      dispatch(connect(accessToken))
    }
    /*
    return (): void => {
      dispatch(disconnect())
      
    }*/
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
