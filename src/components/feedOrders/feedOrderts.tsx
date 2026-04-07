import { loadIngredientList } from '@/services/tasks/action'
import { selectIngredientsStatus } from '@/services/tasks/ingredientSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { OrderBox } from '../OrderBox/orderBox'

import type { Orders, OrdersAllSocketResponse } from '@/utils/types'

import styles from './feedOrders.module.css'

function FeedOrders({
  messages,
}: {
  messages: OrdersAllSocketResponse | null
}): React.JSX.Element {
  const ingredientsStatus = useSelector(selectIngredientsStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(loadIngredientList())
    }
  }, [ingredientsStatus, dispatch])
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
