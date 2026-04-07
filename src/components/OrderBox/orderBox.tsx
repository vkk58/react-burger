import { selectAllIngredients } from '@/services/tasks/ingredientSlice'
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import type { Orders } from '@/utils/types'

import styles from './orderBox.module.css'

type OrderSocketResponseProps = {
  order: Orders
}
export const OrderBox = ({
  order,
}: OrderSocketResponseProps): React.JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const ingredientList = useSelector(selectAllIngredients)
  const ingredients = order?.ingredients ?? []
  const ingredientCount: number = ingredients.length - 5
  const orderSum = ingredients.reduce((orderSum, ingredient) => {
    const found = ingredientList.find((p) => p._id === ingredient)
    return orderSum + (found ? found.price : 0)
  }, 0)

  const handleOnClick = (): void => {
    const isProfilePage = location.pathname === '/profile/orders'
    const isFeedPage = location.pathname === '/feed'

    let targetPath = ''
    if (isProfilePage) {
      targetPath = `/profile/orders/${order._id}`
    } else if (isFeedPage) {
      targetPath = `/feed/${order._id}`
    } else {
      targetPath = `/orders/${order._id}`
    }

    void navigate(targetPath, {
      state: { background: location },
    })
  }

  return (
    <article className={styles.card} onClick={handleOnClick}>
      <div className={styles.header}>
        <div className="text text_type_main-default">#{order.number}</div>
        <FormattedDate
          date={new Date(order?.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <h3 className="text text_type_main-medium">{order.name}</h3>
      <h3 className="text text_type_main-small">
        {order.status === 'done' ? 'Выполнен' : 'В работе'}
      </h3>
      {ingredients.length > 0 && (
        <>
          <div className={styles.ingrImageStack}>
            {ingredients.map((item, index) => {
              if (index === 6) {
                return (
                  <div key={index} className={styles.ingrImage}>
                    +{ingredientCount}
                  </div>
                )
              }

              if (index < 6) {
                const ingredient = ingredientList.find(
                  (ingr) => ingr._id === item
                )
                return (
                  <div key={index} className={styles.ingrImage}>
                    <img
                      src={ingredient?.image_mobile}
                      alt={ingredient?.name}
                    />
                  </div>
                )
              }
              return ''
            })}
          </div>
          <div className={styles.price}>
            <div className="text text_type_main-default">{orderSum}</div>
            <CurrencyIcon type="primary" />
          </div>
        </>
      )}
    </article>
  )
}
