import {
  getOrderDetailsThunk,
  loadIngredientList,
} from '@/services/tasks/action'
import {
  selectAllIngredients,
  selectIngredientsStatus,
} from '@/services/tasks/ingredientSlice'
import {
  clearOrderDetails,
  getOrderDetailsSlice,
  getOrderDetailsSliceError,
  getOrderDetailsSliceStatus,
} from '@/services/tasks/orderDetailsSlice'
import {
  CurrencyIcon,
  FormattedDate,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './orderBoxDetails.module.css'

type OrderBoxDetailsProps = {
  orderId: string
}

export const OrderBoxDetails = ({
  orderId,
}: OrderBoxDetailsProps): React.JSX.Element => {
  const dispatch = useDispatch()
  const ingredientList = useSelector(selectAllIngredients)
  const ingredientsStatus = useSelector(selectIngredientsStatus)
  const order = useSelector(getOrderDetailsSlice)
  const status = useSelector(getOrderDetailsSliceStatus)
  const error = useSelector(getOrderDetailsSliceError)

  useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(loadIngredientList())
    }
  }, [ingredientsStatus, dispatch])

  useEffect(() => {
    dispatch(clearOrderDetails())
    dispatch(getOrderDetailsThunk(orderId))

    return (): void => {
      dispatch(clearOrderDetails())
    }
  }, [orderId, dispatch])

  if (status === 'loading') {
    return <Preloader />
  }

  if (status === 'failed') {
    return (
      <div className="text text_type_main-large">Ошибка загрузки: {error}</div>
    )
  }
  const ingredientsIds = order?.ingredients ?? []

  const ingredientCountMap = ingredientsIds.reduce<Record<string, number>>(
    (acc, id) => {
      acc[id] = (acc[id] || 0) + 1
      return acc
    },
    {}
  )

  const groupedIngredients = Object.entries(ingredientCountMap).map(
    ([id, count]) => {
      const ingredient = ingredientList.find((item) => item._id === id)
      const price = ingredient?.price ?? 0
      return {
        id,
        name: ingredient?.name ?? 'Неизвестный ингредиент',
        image: ingredient?.image_mobile ?? '',
        count,
        unitPrice: price,
        totalPrice: price * count,
      }
    }
  )

  const orderTotal = groupedIngredients.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  )

  return (
    <article className={styles.detailsCard}>
      <div className={styles.header}>
        <span className="text text_type_main-medium">#{order?.number}</span>
      </div>

      <h2 className={`text text_type_main-large ${styles.title}`}>
        {order?.name}
      </h2>

      <p
        className={`text text_type_main-default ${styles.status} ${order?.status === 'done' ? styles.done : ''}`}
      >
        {order?.status === 'done' ? 'Выполнен' : 'Готовится'}
      </p>

      <div className={styles.composition}>
        <h3 className="text text_type_main-medium">Состав:</h3>
        <ul className={styles.ingredientList}>
          {groupedIngredients.map((item) => (
            <li key={item.id} className={styles.ingredientItem}>
              <div className={styles.ingredientImage}>
                <img src={item.image} alt={item.name} />
              </div>
              <span
                className={`text text_type_main-default ${styles.ingredientName}`}
              >
                {item.name}
              </span>
              <div className={styles.ingredientPrice}>
                <span className="text text_type_digits-default">
                  {item.count} x {item.unitPrice}
                </span>
                <CurrencyIcon type="primary" />
                <span className="text text_type_digits-default">
                  {item.totalPrice}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.total}>
        <FormattedDate
          date={new Date(order?.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">{orderTotal}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  )
}
