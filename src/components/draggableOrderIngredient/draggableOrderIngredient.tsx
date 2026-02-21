import { removeIngredientFromOrder } from '@/services/tasks/orderSlice'
import {
  IngredientItem,
  type TIngredient4BurgerConstructor,
} from '@/utils/types'
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

import type { DragSourceMonitor, DropTargetMonitor } from 'react-dnd'

import styles from './draggableOrderIngredient.module.css'

type DragItem = {
  id: string
  index: number
}

export type TOrderIngredientProps = {
  ingredient: TIngredient4BurgerConstructor
  viewIngredientDetails: (ingredient: TIngredient4BurgerConstructor) => void
  moveIngredient: (dragIndex: number, hoverIndex: number) => void
  index: number
}

export const DraggableOrderIngredient = (
  props: TOrderIngredientProps
): React.JSX.Element => {
  const ref = useRef<HTMLLIElement>(null)
  const { ingredient, viewIngredientDetails, moveIngredient, index } = props
  const dispatch = useDispatch()

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: symbol | null }
  >({
    accept: IngredientItem.INGREDIENT,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: IngredientItem.INGREDIENT,
    item: (): DragItem => ({ id: ingredient.idConstructor, index }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const deleteIngredientFromOrder = (idConstructor: string): void => {
    dispatch(removeIngredientFromOrder(idConstructor))
  }

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      onClick={() => {
        viewIngredientDetails(ingredient)
      }}
      className={styles.constructor_item}
      key={ingredient.idConstructor}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={(e: React.MouseEvent): void => {
          e?.stopPropagation()
          deleteIngredientFromOrder(ingredient.idConstructor)
        }}
        isLocked={false}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  )
}
