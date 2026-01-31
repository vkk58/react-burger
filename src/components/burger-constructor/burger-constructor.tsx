import {
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'

import type { TIngredient4BurgerConstructor } from '@utils/types'

import styles from './burger-constructor.module.css'

export type TBurgerConstructorProps = {
  orderArray: TIngredient4BurgerConstructor[]
  setOrderArray: (array: TIngredient4BurgerConstructor[]) => void
}

export const BurgerConstructor = (
  props: TBurgerConstructorProps
): React.JSX.Element => {
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

  const firstIngredient = orderArray[0]
  const lastIngredient = orderArray[orderArrayLength]
  const middleIngredients = orderArray.slice(1, orderArrayLength)
  const orderSum = getSum()
  return (
    <section className={styles.burger_constructor}>
      {firstIngredient && (
        <div className={styles.static_item}>
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
            className={styles.constructor_item}
            key={ingredient.idConstructor}
          >
            <ConstructorElement
              handleClose={() =>
                deleteIngredientFromOrder(ingredient.idConstructor)
              }
              isLocked={false}
              price={ingredient.price}
              text={ingredient.name}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      {orderArray.length > 1 && (
        <div className={styles.static_item}>
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
        </footer>
      )}
    </section>
  )
}
