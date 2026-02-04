import { IngredientDetail } from '../IngredientDetails/IngredientDetail'

import type { TIngredient4BurgerConstructor } from '@/utils/types'

import styles from './modalIngredientDetails.module.css'

type ModalIngredientDetailsProps = {
  ingredient: TIngredient4BurgerConstructor
}

export const ModalIngredientDetails = (
  props: ModalIngredientDetailsProps
): React.JSX.Element => {
  const { ingredient } = props
  return (
    <div className={styles.box}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <img
        className={styles.image}
        src={ingredient.image}
        alt={ingredient.name}
      ></img>
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <div className={styles.detailsContainer}>
        <IngredientDetail name="Калории,ккал" value={ingredient.calories} />
        <IngredientDetail name="Белки, г" value={ingredient.proteins} />
        <IngredientDetail name="Жиры, г" value={ingredient.fat} />
        <IngredientDetail name="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </div>
  )
}
