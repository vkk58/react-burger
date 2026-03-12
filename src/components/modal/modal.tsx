import { CloseIcon } from '@krgaa/react-developer-burger-ui-components'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOverLay } from '../modalOverlay/modalOverlay'

import styles from './modal.module.css'

type TModalIngredientDetailsProps = {
  modalData: React.JSX.Element
  setModalVisible?: (isClose: boolean) => void
}

export const Modal = (
  props: TModalIngredientDetailsProps
): React.JSX.Element => {
  const navigate = useNavigate()
  const { modalData, setModalVisible } = props

  const handleClose = useCallback(() => {
    if (setModalVisible) {
      setModalVisible(false)
    } else {
      void navigate(-1)
    }
  }, [setModalVisible])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return (): void => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [handleClose])

  return (
    <div className={styles.modal}>
      <ModalOverLay setModalVisible={setModalVisible} />
      <div className={styles.modalContent}>
        <CloseIcon
          type="primary"
          onClick={handleClose}
          className={styles.closeIcon}
        />
        {modalData}
      </div>
    </div>
  )
}
