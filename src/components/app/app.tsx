import { loadIngredientList } from '@/services/tasks/action'
import {
  selectAllIngredients,
  selectIngredientsError,
  selectIngredientsStatus,
} from '@/services/tasks/ingredientSlice'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeader } from '@components/app-header/app-header'
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients'

import type { AppDispatch } from '@/services/store'
import type { TIngredient4BurgerConstructor } from '@/utils/types'

import styles from './app.module.css'

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const ingredients = useSelector(selectAllIngredients)
  const ingredientsStatus = useSelector(selectIngredientsStatus)
  const ingredientsError = useSelector(selectIngredientsError)
  const [orderArray, setOrderArray] = useState<TIngredient4BurgerConstructor[]>(
    []
  )

  useEffect(() => {
    void dispatch(loadIngredientList())
  }, [dispatch])

  useEffect(() => {
    if (ingredientsStatus === 'success') {
      console.log('Данные загружены!')
    } else if (ingredientsStatus === 'error') {
      alert(ingredientsError || 'Ошибка загрузки')
    }
  }, [ingredientsStatus, ingredientsError])

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {ingredientsStatus === 'loading' && <Preloader />}
        {ingredientsStatus === 'success' && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              orderArray={orderArray}
              setOrderArray={setOrderArray}
            />
            <BurgerConstructor
              orderArray={orderArray}
              setOrderArray={setOrderArray}
            />
          </>
        )}
        {ingredientsStatus === 'error' && <div>{ingredientsError}</div>}
      </main>
    </div>
  )
}
export default App
