import {
  addIngredient2Order,
  countIngredient,
  orderSliceError,
} from '@/services/tasks/orderSlice'
import {
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/services/store'
import type { TIngredient, TIngredient4BurgerConstructor } from '@/utils/types'

import styles from './ingredientBox.module.css'

type TIngredientBoxProps = {
  ingredient: TIngredient
}
export const IngredientBox = ({
  ingredient,
}: TIngredientBoxProps): React.JSX.Element => {
  const dispatch = useDispatch()

  const orderError = useSelector(orderSliceError)

  const counter = useSelector((state: RootState) =>
    countIngredient(state, ingredient._id)
  )

  useEffect(() => {
    if (orderError) {
      alert(orderError)
    }
  }, [orderError, dispatch])

  const handleOnClick = (): void => {
    const item: TIngredient4BurgerConstructor = {
      ...ingredient,
      idConstructor: crypto.randomUUID(),
    }
    dispatch(addIngredient2Order(item))
  }

  return (
    <>
      <article
        className={styles.ingredientBox}
        id={ingredient._id}
        onClick={handleOnClick}
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
