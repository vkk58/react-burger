import { Tab } from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useMemo, useRef, useState } from 'react'

import { IngredientBox } from '../ingredientBox/ingredientBox'

import type { TIngredient, TIngredient4BurgerConstructor } from '@utils/types'

import styles from './burger-ingredients.module.css'

export type TBurgerIngredientsProps = {
  ingredients: TIngredient[]
  orderArray: TIngredient4BurgerConstructor[]
  setOrderArray: (array: TIngredient4BurgerConstructor[]) => void
}

type TabsValue = {
  type: string
  name: string
}

const tabArray: TabsValue[] = [
  { type: 'bun', name: 'Булки' },
  { type: 'main', name: 'Начинки' },
  { type: 'sauce', name: 'Соусы' },
]

export const BurgerIngredients = (
  props: TBurgerIngredientsProps
): React.JSX.Element => {
  const tabsRecords = useRef<Record<string, HTMLElement | null>>({})
  const tabsContainer = useRef<HTMLElement>(null)
  const { ingredients, orderArray, setOrderArray } = props
  const [selectTab, setSelectedTab] = useState('bun')

  const ingredientTypes = useMemo(() => {
    const types: Record<string, TIngredient[]> = {}

    tabArray.forEach((tab) => {
      types[tab.type] = ingredients.filter(
        (ingredient) => ingredient.type === tab.type
      )
    })

    return types
  }, [ingredients])

  useEffect(() => {
    const selectActiveTab = (): void => {
      console.log('sdfsdsdf')
      const containerEl = tabsContainer.current
      const tabs = tabsRecords.current

      if (!tabs || !containerEl) return
      const containerPos = containerEl.getBoundingClientRect()

      tabArray.forEach((tab) => {
        if (tabs) {
          const curTab = tabs[tab.type]
          const tabPosition = curTab?.getBoundingClientRect()

          if (tabPosition && tabPosition.top <= containerPos.top) {
            setSelectedTab(tab.type)
            return
          }
        }
      })
    }

    if (tabsContainer.current)
      tabsContainer.current.addEventListener('scroll', selectActiveTab)

    return (): void => {
      if (tabsContainer.current)
        tabsContainer.current.removeEventListener('scroll', selectActiveTab)
    }
  }, [])

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
      orderArray.length > 0 &&
      ingredientForOrder &&
      ingredientForOrder.type === 'bun'
    ) {
      alert('Булки уже используются')
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
          {tabArray.map((tab) => (
            <div key={tab.type}>
              <Tab
                key={tab.type}
                value={tab.type}
                active={selectTab === tab.type ? true : false}
                onClick={() => {
                  setSelectedTab(tab.type)
                }}
              >
                {tab.name}
              </Tab>
            </div>
          ))}
        </ul>
      </nav>
      <div
        className={styles.ingredientsContainer}
        ref={(el) => {
          tabsContainer.current = el
        }}
      >
        {tabArray.map((tab) => {
          const ingredientsType = ingredientTypes[tab.type]
          return (
            <div
              className={styles.ingredientSection}
              key={tab.type}
              ref={(el) => {
                if (tabsRecords.current) {
                  tabsRecords.current[tab.type] = el
                }
              }}
            >
              <h2 className="text text_type_main-large">{tab.name}</h2>
              <div className={styles.ingredientsList}>
                {ingredientsType.map((ingredient) => (
                  <IngredientBox
                    key={ingredient._id}
                    ingredient={ingredient}
                    counter={getCounter(ingredient._id)}
                    addIngredient2Order={addIngredient2Order}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
