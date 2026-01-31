import { Tab } from '@krgaa/react-developer-burger-ui-components'
import { useMemo, useState } from 'react'

import { IngredientBox } from '../ingredientBox/ingredientBox'

import type { TIngredient, TIngredient4BurgerConstructor } from '@utils/types'

import styles from './burger-ingredients.module.css'

export type TBurgerIngredientsProps = {
  ingredients: TIngredient[]
  orderArray: TIngredient4BurgerConstructor[]
  setOrderArray: (array: TIngredient4BurgerConstructor[]) => void
}

export const BurgerIngredients = (
  props: TBurgerIngredientsProps
): React.JSX.Element => {
  const { ingredients, orderArray, setOrderArray } = props
  const [selectTab, setSelectedTab] = useState('bun')
  const ingedientsArray = useMemo(() => {
    return ingredients.filter((i) => i.type === selectTab)
  }, [selectTab])

  const addIngredient2Order = (id: string): void => {
    const ingredientForOrder = ingredients.find((item) => item._id === id)
    if (
      orderArray.length === 0 &&
      ingredientForOrder &&
      ingredientForOrder.type !== 'bun'
    ) {
      alert('Сначала должны быть булки')
      return
    }

    if (
      orderArray.length === 0 &&
      ingredientForOrder &&
      ingredientForOrder.type === 'bun'
    ) {
      const arrayBuns: TIngredient4BurgerConstructor[] = [
        { ...ingredientForOrder, idConstructor: crypto.randomUUID() },
        { ...ingredientForOrder, idConstructor: crypto.randomUUID() },
      ]
      setOrderArray(arrayBuns)
      return
    }

    if (ingredientForOrder && ingredientForOrder !== undefined) {
      const ingredientForOrderwithId: TIngredient4BurgerConstructor = {
        ...ingredientForOrder,
        idConstructor: crypto.randomUUID(),
      }
      /*
      const newOrderArray: TIngredient4BurgerConstructor[] = [
        ...orderArray,
        ingredientForOrderwithId,
      ]
      setOrderArray(newOrderArray)
      */
      const newOrderArray: TIngredient4BurgerConstructor[] = [...orderArray]
      newOrderArray.splice(-1, 0, ingredientForOrderwithId)
      setOrderArray(newOrderArray)
    }
  }

  const getCounter = (id: string): number => {
    const ret = orderArray.filter((array) => array._id === id).length
    return ret ?? 0
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={selectTab === 'bun' ? true : false}
            onClick={() => {
              setSelectedTab('bun')
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={selectTab === 'main' ? true : false}
            onClick={() => {
              setSelectedTab('main')
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={selectTab === 'sauce' ? true : false}
            onClick={() => {
              setSelectedTab('sauce')
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.ingredientsList}>
        {ingedientsArray.map((ingredient) => (
          <IngredientBox
            key={ingredient._id}
            ingredient={ingredient}
            counter={getCounter(ingredient._id)}
            addIngredient2Order={addIngredient2Order}
          />
        ))}
      </div>
    </section>
  )
}
