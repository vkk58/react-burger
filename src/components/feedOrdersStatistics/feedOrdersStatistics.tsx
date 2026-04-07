import { useAppSelector } from '@/hooks/socketHooks'
import { selectAllOrders } from '@/services/tasks/ordersFeedAllSocketSlice'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'

import type { Orders } from '@/utils/types'

import styles from './feedOrdersStatistics.module.css'

const splitIntoColumns = (
  orders: Orders[],
  maxPerColumn = 10,
  maxColumns = 2
): number[][] => {
  const numbers = orders.map((order) => order.number)
  const columns: number[][] = []
  for (
    let i = 0;
    i < Math.min(numbers.length, maxPerColumn * maxColumns);
    i += maxPerColumn
  ) {
    columns.push(numbers.slice(i, i + maxPerColumn))
  }
  return columns
}

function FeedOrdersStatistics(): React.JSX.Element {
  const messages = useAppSelector(selectAllOrders)

  if (!messages) {
    return <Preloader />
  }

  const allOrders = messages.orders ?? []

  const doneOrders = allOrders.filter((order) => order.status === 'done')
  const pendingOrders = allOrders.filter((order) => order.status !== 'done')

  const doneColumns = splitIntoColumns(doneOrders)
  const pendingColumns = splitIntoColumns(pendingOrders)

  return (
    <div>
      <aside className={styles.statusPanel}>
        <div className={styles.statusColumns}>
          <div className={styles.statusGroup}>
            <h2 className="text text_type_main-medium">Готовы:</h2>
            <div className={styles.columnsContainer}>
              {doneColumns.map((column, idx) => (
                <ul key={idx} className={styles.column}>
                  {column.map((num) => (
                    <li
                      key={num}
                      className={`="text text_type_main-small" ${styles.done}`}
                    >
                      {num}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className={styles.statusGroup}>
            <h2 className="text text_type_main-medium">В работе:</h2>
            <div className={styles.columnsContainer}>
              {pendingColumns.map((column, idx) => (
                <ul key={idx} className={styles.column}>
                  {column.map((num) => (
                    <li key={num} className="text text_type_main-small">
                      {num}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className={`text text_type_digits-large ${styles.total}`}>
              {messages.total ?? 0}
            </p>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className={`text text_type_digits-large ${styles.today}`}>
              {messages.totalToday ?? 0}
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default FeedOrdersStatistics
