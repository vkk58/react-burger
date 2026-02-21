import {
  addIngredient2Order,
  countIngredient,
  currentOrder,
} from '@/services/tasks/orderSlice'
import {
  IngredientItem,
  type TIngredient,
  type TIngredient4BurgerConstructor,
} from '@/utils/types'
import {
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useDrag, type DragSourceMonitor } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/services/store'

import styles from './ingredientBox.module.css'

type TIngredientBoxProps = {
  ingredient: TIngredient
}
export const IngredientBox = ({
  ingredient,
}: TIngredientBoxProps): React.JSX.Element => {
  const orderArray = useSelector(currentOrder)
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: IngredientItem.INGREDIENT,
      item: { ingredient },
      collect: (monitor: DragSourceMonitor): { isDragging: boolean } => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [ingredient]
  )
  const opacity = isDragging ? 0.4 : 1

  const dispatch = useDispatch()

  const counter = useSelector((state: RootState) =>
    countIngredient(state, ingredient._id)
  )

  const handleOnClick = (): void => {
    const hasBun = orderArray.some((item) => item.type === 'bun')

    if (ingredient.type !== 'bun' && !hasBun) {
      alert('Сначала добавьте булку!')
      return
    }

    const item: TIngredient4BurgerConstructor = {
      ...ingredient,
      idConstructor: crypto.randomUUID(),
    }
    dispatch(addIngredient2Order(item))
  }

  return (
    <article
      ref={dragRef as unknown as React.RefObject<HTMLElement>}
      className={styles.ingredientBox}
      style={{ opacity }}
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
  )
}
