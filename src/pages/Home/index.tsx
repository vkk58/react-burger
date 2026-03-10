import { loadIngredientList } from '@/services/tasks/action'
import {
  selectIngredientsError,
  selectIngredientsStatus,
} from '@/services/tasks/ingredientSlice'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeader } from '@components/app-header/app-header'
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients'

import type { AppDispatch } from '@/services/store'

import styles from './styles.module.css'

export const Home = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const ingredientsStatus = useSelector(selectIngredientsStatus)
  const ingredientsError = useSelector(selectIngredientsError)

  useEffect(() => {
    void dispatch(loadIngredientList())
  }, [dispatch])

  useEffect(() => {
    if (ingredientsStatus === 'error') {
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
      <DndProvider backend={HTML5Backend}>
        <main className={`${styles.main} pl-5 pr-5`}>
          {ingredientsStatus === 'loading' && <Preloader />}
          {ingredientsStatus === 'success' && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
          {ingredientsStatus === 'error' && <div>{ingredientsError}</div>}
        </main>
      </DndProvider>
    </div>
  )
}
