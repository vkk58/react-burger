import { sendOrder } from '@/integration/sendOrder'
import {
  addIngredient2Order,
  clearOrder,
  currentOrder,
  orderSum,
} from '@/services/tasks/orderSlice'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import {
  type TIngredient,
  type TIngredient4BurgerConstructor,
  IngredientItem,
} from '@utils/types'

import { Modal } from '../modal/modal'
import { ModalIngredientDetails } from '../modalIngredientDetails/modalIngredientDetails'
import { ModalOrderDetails } from '../modalOrderDetails/modalOrderDetails'
import { OrderContainer } from '../OrderContainer/OrderContainer'

import styles from './burger-constructor.module.css'

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false)
  const orderArray = useSelector(currentOrder)
  const orderArrayLength = orderArray.length - 1
  const [modalData, setModaldata] = useState<React.JSX.Element>(null)

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
        const hasBun = orderArray.some((item) => item.type === 'bun')
        if (item.ingredient.type !== 'bun' && !hasBun) {
          alert('Сначала добавьте булку!')
          return
        }
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
          />
        </div>
      )}
      {middleIngredients.length > 0 && (
        <OrderContainer
          ingredients={middleIngredients}
          viewIngredientDetails={viewIngredientDetails}
        />
      )}
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
