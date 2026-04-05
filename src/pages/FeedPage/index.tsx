import FeedOrders from '@/components/feedOrders/feedOrderts'
import FeedOrdersStatistics from '@/components/feedOrdersStatistics/feedOrdersStatistics'
import { useAppDispatch, useAppSelector } from '@/hooks/socketHooks'
import {
  connect,
  disconnect,
  selectAllOrders,
  selectIsConnected,
  selectIsLoading,
} from '@/services/tasks/ordersFeedAllSocketSlice'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useRef } from 'react'

import styles from './styles.module.css'

const FeedPage = (): React.JSX.Element => {
  const isLoading = useAppSelector(selectIsLoading)
  const isConnected = useAppSelector(selectIsConnected)
  const messages = useAppSelector(selectAllOrders)
  const dispatch = useAppDispatch()
  const isCleanupScheduled = useRef(false)
  useEffect(() => {
    if (!isCleanupScheduled.current) {
      dispatch(connect())
      isCleanupScheduled.current = true
    }

    return (): void => {
      if (isConnected) {
        dispatch(disconnect())
      }
    }
  }, [dispatch, isConnected])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={styles.app}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Лента заказов
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <FeedOrders messages={messages} />
        <FeedOrdersStatistics />
      </main>
    </div>
  )
}

export default FeedPage
