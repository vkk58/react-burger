import {
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components'

import type { TIngredient } from '@utils/types'

import styles from './burger-constructor.module.css'

export type TBurgerConstructorProps = {
  orderArray: TIngredient[]
  setOrderArray: (array: TIngredient[]) => void
}
export const BurgerConstructor = (
  props: TBurgerConstructorProps
): React.JSX.Element => {
  console.log(props.orderArray)

  const { orderArray, setOrderArray } = props
  const orderArrayLength = orderArray.length - 1
  const deleteIngredientFromOrder = (index: number): void => {
    if (index !== 0 || index !== orderArrayLength) {
      const newOrderArray = orderArray.filter((_, i) => i !== index)
      setOrderArray(newOrderArray)
    }
  }
  const getType = (currentPosition: number): string => {
    if (currentPosition === 0) return 'top'
    if (currentPosition === orderArrayLength) return 'bottom'

    return ''
  }

  const getSum = (): number => {
    let ret = 0
    for (const ingredient of orderArray) {
      ret += ingredient.price
    }
    return ret
  }

  return (
    <section className={styles.burger_constructor}>
      {orderArray.map((ingredient, index) => (
        <li className={styles.constructor_item} key={ingredient._id}>
          <ConstructorElement
            handleClose={function fee() {
              deleteIngredientFromOrder(index)
            }}
            isLocked={index === 0 || index === orderArrayLength}
            price={ingredient.price}
            text={ingredient.name}
            thumbnail={ingredient.image}
            type={getType(index)}
          />
        </li>
      ))}
      <footer className={styles.priceContainer}>
        <p className="text text_type_main-medium">{getSum()}</p>
        <CurrencyIcon type="primary" />
      </footer>
    </section>
  )
}
