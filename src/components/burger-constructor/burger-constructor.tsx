import { sendOrder } from '@/integration/sendOrder'
import {
  addIngredient2Order,
  clearOrder,
  currentOrder,
  orderSum,
  removeIngredientFromOrder,
} from '@/services/tasks/orderSlice'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import { IngredientItem } from '../ingredientBox/ingredientBox'
import { Modal } from '../modal/modal'
import { ModalIngredientDetails } from '../modalIngredientDetails/modalIngredientDetails'
import { ModalOrderDetails } from '../modalOrderDetails/modalOrderDetails'

import type { TIngredient, TIngredient4BurgerConstructor } from '@utils/types'

import styles from './burger-constructor.module.css'

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false)
  const orderArray = useSelector(currentOrder)
  const orderArrayLength = orderArray.length - 1
  const [modalData, setModaldata] = useState<React.JSX.Element>(null)

  const deleteIngredientFromOrder = (idConstructor: string): void => {
    dispatch(removeIngredientFromOrder(idConstructor))
  }
  const currentOrderSum = useSelector(orderSum)
  const viewIngredientDetails = (
    ingredient: TIngredient4BurgerConstructor
  ): void => {
    if (ingredient !== undefined) {
      const modalContent = <ModalIngredientDetails ingredient={ingredient} />

      setModaldata(modalContent)
      setModalVisible(true)
    }
  }

  const createOrder = async (): Promise<void> => {
    const createOrderResult = await sendOrder(orderArray)
    if (createOrderResult.success === true) {
      const modalContent = (
        <ModalOrderDetails orderId={createOrderResult.order.number} />
      )
      setModaldata(modalContent)
      setModalVisible(true)
      dispatch(clearOrder())
    }
  }

  const [, dropRef] = useDrop(
    () => ({
      accept: IngredientItem.INGREDIENT,
      drop: (item: { ingredient: TIngredient }): void => {
        console.log('itemdsfd', item)
        if (item) {
          const ingredientItem: TIngredient4BurgerConstructor = {
            ...item.ingredient,
            idConstructor: crypto.randomUUID(),
          }

          dispatch(addIngredient2Order(ingredientItem))
        }
      },
    }),
    [orderArray]
  )

  const firstIngredient = orderArray[0]
  const lastIngredient = orderArray[orderArrayLength]
  const middleIngredients = orderArray.slice(1, orderArrayLength)

  return (
    <section
      className={styles.burger_constructor}
      ref={dropRef as unknown as React.RefObject<HTMLElement>}
    >
      {firstIngredient && (
        <div
          className={styles.static_item}
          onClick={() => {
            viewIngredientDetails(firstIngredient)
          }}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${firstIngredient.name} (верх)`}
            price={firstIngredient.price}
            thumbnail={firstIngredient.image}
            handleClose={() =>
              deleteIngredientFromOrder(firstIngredient.idConstructor)
            }
          />
        </div>
      )}
      <ul className={styles.scrollable_list}>
        {middleIngredients.map((ingredient) => (
          <li
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
        ))}
      </ul>
      {orderArray.length > 1 && (
        <div
          className={styles.static_item}
          onClick={() => {
            viewIngredientDetails(lastIngredient)
          }}
        >
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${lastIngredient.name} (низ)`}
            price={lastIngredient.price}
            thumbnail={lastIngredient.image}
            handleClose={() =>
              deleteIngredientFromOrder(lastIngredient.idConstructor)
            }
          />
        </div>
      )}
      {currentOrderSum && (
        <footer className={styles.priceContainer}>
          <p className="text text_type_main-medium">{currentOrderSum}</p>
          <CurrencyIcon type="primary" />
          <Button
            onClick={() => {
              void createOrder()
            }}
            size="medium"
            type="primary"
          >
            Оформить заказ
          </Button>
        </footer>
      )}
      {isModalVisible && (
        <Modal setModalVisible={setModalVisible} modalData={modalData} />
      )}
    </section>
  )
}
