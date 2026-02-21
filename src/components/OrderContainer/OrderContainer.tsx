import { currentOrder, sortOrder } from '@/services/tasks/orderSlice'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DraggableOrderIngredient } from '../draggableOrderIngredient/draggableOrderIngredient'

import type { TIngredient4BurgerConstructor } from '@/utils/types'

import styles from './OrderContainer.module.css'

export type TBurgerIngredientsProps = {
  ingredients: TIngredient4BurgerConstructor[]
  viewIngredientDetails: (ingredient: TIngredient4BurgerConstructor) => void
}

export const OrderContainer = (
  props: TBurgerIngredientsProps
): React.JSX.Element => {
  const { ingredients, viewIngredientDetails } = props
  const dispatch = useDispatch()
  const orderArray = useSelector(currentOrder)
  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const topBun = orderArray[0]
      const bottomBun = orderArray[orderArray.length - 1]
      const fillings = orderArray.slice(1, -1)
      const newFillings = [...fillings]
      const [removed] = newFillings.splice(dragIndex, 1)
      newFillings.splice(hoverIndex, 0, removed)
      const newOrder = [topBun, ...newFillings, bottomBun]
      dispatch(sortOrder(newOrder))
    },
    [orderArray, dispatch]
  )
  const renderIngredient = (
    ingredient: TIngredient4BurgerConstructor,
    index: number
  ): React.JSX.Element => {
    return (
      <DraggableOrderIngredient
        key={ingredient.idConstructor}
        ingredient={ingredient}
        index={index}
        moveIngredient={moveIngredient}
        viewIngredientDetails={viewIngredientDetails}
      />
    )
  }
  return (
    <ul className={styles.scrollable_list}>
      {ingredients.map((ingredient, index) =>
        renderIngredient(ingredient, index)
      )}
    </ul>
  )
}
