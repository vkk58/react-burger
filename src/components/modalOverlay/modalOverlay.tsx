import styles from './modalOverlay.module.css'

type TModalIngredientDetailsProps = {
  setModalVisible: (isClose: boolean) => void
}

export const ModalOverLay = (
  props: TModalIngredientDetailsProps
): React.JSX.Element => {
  const { setModalVisible } = props

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setModalVisible(false)}
    />
  )
}
