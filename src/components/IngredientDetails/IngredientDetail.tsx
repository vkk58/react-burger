import styles from './ingredientDetail.module.css'

type TIngredientDetailProps = {
  name: string
  value: number
}
export const IngredientDetail = (
  props: TIngredientDetailProps
): React.JSX.Element => {
  const { name, value } = props
  return (
    <div className={styles.box}>
      <div className="text text_type_main-default text_color_inactive">
        {name}
      </div>
      <div className="text text_type_main-default text_color_inactive">
        {value}
      </div>
    </div>
  )
}
