import { IngredientDetails } from '@/components/ingredientDetails/ingredientDetails'
import { Modal } from '@/components/modal/modal'
import { loadIngredientList } from '@/services/tasks/action'
import {
  selectAllIngredients,
  selectIngredientsError,
  selectIngredientsStatus,
} from '@/services/tasks/ingredientSlice'
import { Preloader } from '@krgaa/react-developer-burger-ui-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import type { TIngredient } from '@utils/types'

export const IngredientPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const ingredients = useSelector(selectAllIngredients)
  const status = useSelector(selectIngredientsStatus)
  const error = useSelector(selectIngredientsError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadIngredientList())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <Preloader />
  }

  if (status === 'failed') {
    return (
      <div className="text text_type_main-large">Ошибка загрузки: {error}</div>
    )
  }

  const ingredient = ingredients.find((item: TIngredient) => item._id === id)

  if (!ingredient) {
    return <div className="text text_type_main-large">Ингредиент не найден</div>
  }
  return <Modal modalData={<IngredientDetails ingredient={ingredient} />} />
}
