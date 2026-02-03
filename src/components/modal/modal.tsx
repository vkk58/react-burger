import { CloseIcon } from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'

import { ModalOverLay } from '../modalOverlay/modalOverlay'

import styles from './modal.module.css'

type TModalIngredientDetailsProps = {
  modalData: React.JSX.Element
  setModalVisible: (isClose: boolean) => void
}

export const Modal = (
  props: TModalIngredientDetailsProps
): React.JSX.Element => {
  const { modalData, setModalVisible } = props

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setModalVisible(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return (): void => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])

  return (
    <div className={styles.modal}>
      <ModalOverLay setModalVisible={setModalVisible} />
      <div className={styles.modalContent}>
        <CloseIcon
          type="primary"
          onClick={() => setModalVisible(false)}
          className={styles.closeIcon}
        />
        {modalData}
      </div>
    </div>
  )
}
