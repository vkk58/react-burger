import {
  CheckMarkIcon,
  CloseIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'

import styles from './modalOrderDetails.module.css'

type TModalOrderDetailsProps = {
  setVisibleOrder: (isClose: boolean) => void
}

export const ModalOrderDetails = (
  props: TModalOrderDetailsProps
): React.JSX.Element => {
  const { setVisibleOrder } = props
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setVisibleOrder(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return (): void => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.box}>
        <CloseIcon type="primary" onClick={() => setVisibleOrder(false)} />
        <p className="text text_type_digits-large">034536</p>
        <p className="text text_type_main-default">идентификатор заказа</p>
        <CheckMarkIcon type="success" />
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитель готовности на орбитальной станции
        </p>
      </div>
    </div>
  )
}
