import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components'
import { useState } from 'react'

import { ModalIngredientDetails } from '../modalIngredientDetails/modalIngredientDetails'
import { ModalOrderDetails } from '../modalOrderDetails/modalOrderDetails'

import type { TIngredient4BurgerConstructor } from '@utils/types'

import styles from './burger-constructor.module.css'

export type TBurgerConstructorProps = {
  orderArray: TIngredient4BurgerConstructor[]
  setOrderArray: (array: TIngredient4BurgerConstructor[]) => void
}

export const BurgerConstructor = (
  props: TBurgerConstructorProps
): React.JSX.Element => {
  const [isVisibleIngredientDetails, setVisibleIngredientDetails] =
    useState(false)
  const [isVisibleOrder, setVisibleOrder] = useState(false)
  const [ingredientDetail, setIngredientDetail] =
    useState<TIngredient4BurgerConstructor>()
  const { orderArray, setOrderArray } = props
  const orderArrayLength = orderArray.length - 1

  const deleteIngredientFromOrder = (idConstructor: string): void => {
    const newOrderArray = orderArray.filter(
      (item) => item.idConstructor !== idConstructor
    )
    setOrderArray(newOrderArray)
  }
  const getSum = (): number => {
    return orderArray.reduce((sum, ingredient) => sum + ingredient.price, 0)
  }
  const viewIngredientDetails = (
    ingredient: TIngredient4BurgerConstructor
  ): void => {
    setIngredientDetail(ingredient)
    setVisibleIngredientDetails(true)
  }

  const createOrder = (): void => {
    setOrderArray([])
    setVisibleOrder(true)
  }

  const firstIngredient = orderArray[0]
  const lastIngredient = orderArray[orderArrayLength]
  const middleIngredients = orderArray.slice(1, orderArrayLength)
  const orderSum = getSum()

  return (
    <section className={styles.burger_constructor}>
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
              handleClose={(e: React.MouseEvent) => {
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
      {orderSum && (
        <footer className={styles.priceContainer}>
          <p className="text text_type_main-medium">{orderSum}</p>
          <CurrencyIcon type="primary" />
          <Button
            onClick={() => {
              createOrder()
            }}
            size="medium"
            type="primary"
          >
            Оформить заказ
          </Button>
        </footer>
      )}
      {isVisibleIngredientDetails && ingredientDetail !== undefined && (
        <ModalIngredientDetails
          ingredient={ingredientDetail}
          setVisibleIngredientDetails={setVisibleIngredientDetails}
        />
      )}
      {isVisibleOrder && (
        <ModalOrderDetails setVisibleOrder={setVisibleOrder} />
      )}
    </section>
  )
}
