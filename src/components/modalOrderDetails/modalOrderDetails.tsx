import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components'

import styles from './modalOrderDetails.module.css'

type TOrderProps = {
  orderId: number
}

export const ModalOrderDetails = ({
  orderId,
}: TOrderProps): React.JSX.Element => {
  return (
    <div className={styles.box}>
      <p className="text text_type_digits-large">{orderId}</p>
      <p className="text text_type_main-default">идентификатор заказа</p>
      <CheckMarkIcon type="success" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
