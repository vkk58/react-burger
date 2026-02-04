import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components'

import styles from './modalOrderDetails.module.css'

export const ModalOrderDetails = (): React.JSX.Element => {
  return (
    <div className={styles.box}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-default">идентификатор заказа</p>
      <CheckMarkIcon type="success" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитель готовности на орбитальной станции
      </p>
    </div>
  )
}
