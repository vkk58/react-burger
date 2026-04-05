import { OrderBox } from '../OrderBox/orderBox'

import type { Orders, OrdersAllSocketResponse } from '@/utils/types'

import styles from './feedOrders.module.css'

function FeedOrders({
  messages,
}: {
  messages: OrdersAllSocketResponse | null
}): React.JSX.Element {
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
