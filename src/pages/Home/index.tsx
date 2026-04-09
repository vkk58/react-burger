import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Outlet } from 'react-router-dom'

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients'

import styles from './style.module.css'

export const Home = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
      <Outlet />
    </div>
  )
}
