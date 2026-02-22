import { IngredientDetailComponent } from '../ingredientDetailsComponent/IngredientDetailComponent'

import type { TIngredient } from '@/utils/types'

import styles from './ingredientDetails.module.css'

type IngredientDetailsProps = {
  ingredient: TIngredient
}

export const IngredientDetails = (
  props: IngredientDetailsProps
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
        <IngredientDetailComponent
          name="Калории,ккал"
          value={ingredient.calories}
        />
        <IngredientDetailComponent
          name="Белки, г"
          value={ingredient.proteins}
        />
        <IngredientDetailComponent name="Жиры, г" value={ingredient.fat} />
        <IngredientDetailComponent
          name="Углеводы, г"
          value={ingredient.carbohydrates}
        />
      </div>
    </div>
  )
}
