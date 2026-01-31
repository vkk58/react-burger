import { CloseIcon } from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'

import { IngredientDetail } from '../IngredientDetails/IngredientDetail'

import type { TIngredient4BurgerConstructor } from '@/utils/types'

import styles from './modalIngredientDetails.module.css'

type TModalIngredientDetailsProps = {
  ingredient: TIngredient4BurgerConstructor | undefined
  setVisibleIngredientDetails: (isClose: boolean) => void
}

export const ModalIngredientDetails = (
  props: TModalIngredientDetailsProps
): React.JSX.Element => {
  const { ingredient, setVisibleIngredientDetails } = props

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setVisibleIngredientDetails(false)
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
        <CloseIcon
          type="primary"
          onClick={() => setVisibleIngredientDetails(false)}
        />
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <img
          className={styles.image}
          src={ingredient.image}
          alt={ingredient.name}
        ></img>
        <p className="text text_type_main-small">{ingredient.name}</p>
        <div className={styles.detailsContainer}>
          <IngredientDetail name="Калории,ккал" value={ingredient.calories} />
          <IngredientDetail name="Белки, г" value={ingredient.proteins} />
          <IngredientDetail name="Жиры, г" value={ingredient.fat} />
          <IngredientDetail
            name="Углеводы, г"
            value={ingredient.carbohydrates}
          />
        </div>
      </div>
    </div>
  )
}
