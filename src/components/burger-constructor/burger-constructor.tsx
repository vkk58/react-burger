import { createOrder } from '@/services/tasks/action'
import {
  addIngredient2Order,
  clearOrder,
  currentOrder,
  orderSum,
} from '@/services/tasks/orderSlice'
import {
  getOrderError,
  getOrderNumber,
  getOrderStatus,
} from '@/services/tasks/sendOrderSlice'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'

import {
  type TIngredient,
  type TIngredient4BurgerConstructor,
  IngredientItem,
} from '@utils/types'

import { Modal } from '../modal/modal'
import { OrderContainer } from '../OrderContainer/OrderContainer'
import { OrderDetails } from '../OrderDetails/OrderDetails'

import styles from './burger-constructor.module.css'

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false)
  const orderArray = useSelector(currentOrder)
  const orderArrayLength = orderArray.length - 1
  const [modalData, setModaldata] = useState<React.JSX.Element>(null)
  const orderStatus = useSelector(getOrderStatus)
  const orderError = useSelector(getOrderError)
  const orderNumber = useSelector(getOrderNumber)

  const currentOrderSum = useSelector(orderSum)

  const sendOrder = (): void => {
    void dispatch(createOrder(orderArray))
  }

  useEffect(() => {
    if (orderStatus === 'success' && orderNumber) {
      const modalContent = <OrderDetails orderId={orderNumber} />
      setModaldata(modalContent)
      setModalVisible(true)
      dispatch(clearOrder())
    } else if (orderStatus === 'error' && orderError) {
      alert(`Ошибка при создании заказа: ${orderError}`)
    }
  }, [orderStatus, orderNumber, orderError, dispatch])

  const [, dropRef] = useDrop(
    () => ({
      accept: IngredientItem.INGREDIENT,
      drop: (item: { ingredient: TIngredient }): void => {
        const hasBun = orderArray.some((item) => item.type === 'bun')
        if (item.ingredient === undefined) return
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
        <div className={styles.static_item}>
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
        <OrderContainer ingredients={middleIngredients} />
      )}
      {orderArray.length > 1 && (
        <div className={styles.static_item}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${lastIngredient.name} (низ)`}
            price={lastIngredient.price}
            thumbnail={lastIngredient.image}
          />
        </div>
      )}
      {currentOrderSum > 0 && (
        <footer className={styles.priceContainer}>
          <p className="text text_type_main-medium">{currentOrderSum}</p>
          <CurrencyIcon type="primary" />
          <Button
            onClick={() => {
              void sendOrder()
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
