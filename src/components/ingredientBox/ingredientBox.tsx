import { countIngredient } from '@/services/tasks/orderSlice'
import { IngredientItem, type TIngredient } from '@/utils/types'
import {
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDrag, type DragSourceMonitor } from 'react-dnd'
import { useSelector } from 'react-redux'

import { IngredientDetails } from '../ingredientDetails/ingredientDetails'
import { Modal } from '../modal/modal'

import type { RootState } from '@/services/store'

import styles from './ingredientBox.module.css'

type TIngredientBoxProps = {
  ingredient: TIngredient
}
export const IngredientBox = ({
  ingredient,
}: TIngredientBoxProps): React.JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalData, setModaldata] = useState<React.JSX.Element>(null)
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

  const counter = useSelector((state: RootState) =>
    countIngredient(state, ingredient._id)
  )

  const handleOnClick = (): void => {
    if (ingredient !== undefined) {
      const modalContent = <IngredientDetails ingredient={ingredient} />
      setModaldata(modalContent)
      setModalVisible(true)
    }
  }

  return (
    <>
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
      {isModalVisible && (
        <Modal setModalVisible={setModalVisible} modalData={modalData} />
      )}
    </>
  )
}
