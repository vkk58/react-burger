import { Tab } from '@krgaa/react-developer-burger-ui-components'
import { useMemo, useState } from 'react'

import { IngredientBox } from '../ingredientBox/ingredientBox'

import type { TIngredient } from '@utils/types'

import styles from './burger-ingredients.module.css'

type TBurgerIngredientsProps = {
  ingredients: TIngredient[]
}

type IngredientsCounter = { id: string; counter: number }

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [selectTab, setSelectedTab] = useState('bun')
  const [ingredientsCounterArray, setingredientsCounterArray] = useState<
    IngredientsCounter[]
  >([])

  const increaseArray = (id: string): void => {
    setingredientsCounterArray((array) => {
      const newArray: IngredientsCounter[] | undefined = [...array]
      const index = newArray.findIndex((item) => item.id === id)
      if (index === -1) {
        return [...array, { id: id, counter: 1 }]
      }

      newArray[index] = {
        ...newArray[index],
        counter: newArray[index].counter + 1,
      }
      return newArray
    })
  }

  const ingedientsArray = useMemo(() => {
    return ingredients.filter((i) => i.type === selectTab)
  }, [selectTab])

  const getCounter = (id: string): number => {
    const ret = ingredientsCounterArray.find(
      (array) => array.id === id
    )?.counter
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
            increaseArray={increaseArray}
          />
        ))}
      </div>
    </section>
  )
}
