import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components'

import styles from './OrderDetails.module.css'

type TOrderProps = {
  orderId: number
}

export const OrderDetails = ({ orderId }: TOrderProps): React.JSX.Element => {
  return (
    <div className={styles.box}>
      <p className="text text_type_digits-large mb-8">{orderId}</p>
      <p className="text text_type_main-default mb-15">идентификатор заказа</p>
      <CheckMarkIcon type="success" />
      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
