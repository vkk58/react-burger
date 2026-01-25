import {
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'

import type { TIngredient } from '@/utils/types'

import styles from './ingredientBox.module.css'

type TIngredientBoxProps = {
  ingredient: TIngredient
  counter: number
  increaseArray: (id: string) => void
}
export const IngredientBox = ({
  ingredient,
  counter,
  increaseArray,
}: TIngredientBoxProps): React.JSX.Element => {
  console.log('tyt', counter)

  console.log('return', counter)
  return (
    <>
      <article
        className={styles.ingredientBox}
        id={ingredient._id}
        onClick={() => {
          increaseArray(ingredient._id)
        }}
      >
        <img src={ingredient.image} alt={ingredient.name}></img>
        <div className={styles.priceContainer}>
          <div className="text text_type_main-small">{ingredient.price}</div>
          <CurrencyIcon type="primary" />
        </div>
        <div className="text text_type_main-small">{ingredient.name}</div>
        {counter > 0 ? (
          <Counter count={counter} size="small" extraClass={styles.counter} />
        ) : (
          <></>
        )}
      </article>
    </>
  )
}
