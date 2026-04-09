import styles from './modalOverlay.module.css'

type TModalIngredientDetailsProps = {
  onClose: () => void
}

export const ModalOverLay = (
  props: TModalIngredientDetailsProps
): React.JSX.Element => {
  const { onClose } = props

  return <div className={styles.modalOverlay} onClick={onClose} />
}
