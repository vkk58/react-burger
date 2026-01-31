import { getIngredients } from '@/integration/ingredients'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'

import { AppHeader } from '@components/app-header/app-header'
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients'

import type { TIngredient, TIngredient4BurgerConstructor } from '@/utils/types'

import styles from './app.module.css'

export const App = (): React.JSX.Element => {
  const [isLoad, setLoad] = useState(false)
  const [ingedientsArray, setIngedientsArray] = useState<TIngredient[]>([])
  const [orderArray, setOrderArray] = useState<TIngredient4BurgerConstructor[]>(
    []
  )
  useEffect(() => {
    getIngredients()
      .then((result) => {
        setIngedientsArray(result)
        setLoad(true)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoad ? (
          <>
            <BurgerIngredients
              ingredients={ingedientsArray}
              orderArray={orderArray}
              setOrderArray={setOrderArray}
            />
            <BurgerConstructor
              orderArray={orderArray}
              setOrderArray={setOrderArray}
            />
          </>
        ) : (
          <Preloader />
        )}
      </main>
    </div>
  )
}
export default App
