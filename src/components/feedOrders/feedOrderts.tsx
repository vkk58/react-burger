import { useAppSelector } from '@/hooks/socketHooks'
import { selectAllOrders } from '@/services/tasks/ordersFeedAllSocketSlice'

import { OrderBox } from '../OrderBox/orderBox'

import type { Orders } from '@/utils/types'

import styles from './feedOrders.module.css'

function FeedOrders(): React.JSX.Element {
  const messages = useAppSelector(selectAllOrders)

  const orders = messages?.orders ?? []

  return (
    <ul className={styles.scrollContainer}>
      {orders.length > 0 ? (
        orders.map((order: Orders) => (
          <li key={order._id}>
            <OrderBox order={order} />
          </li>
        ))
      ) : (
        <li className={styles.emptyMessage}>Заказов не было</li>
      )}
    </ul>
  )
}

export default FeedOrders
