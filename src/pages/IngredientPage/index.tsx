import { IngredientDetails } from '@/components/ingredientDetails/ingredientDetails'
import { Modal } from '@/components/modal/modal'
import { useAppSelector } from '@/hooks/socketHooks'
import { selectAllIngredients } from '@/services/tasks/ingredientSlice'
import { useParams } from 'react-router-dom'

import type { TIngredient } from '@utils/types'

export const IngredientPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>()

  const ingredients = useAppSelector(selectAllIngredients)

  const ingredient = ingredients.find((item: TIngredient) => item._id === id)

  if (!ingredient) {
    return <div className="text text_type_main-large">Ингредиент не найден</div>
  }
  return <Modal modalData={<IngredientDetails ingredient={ingredient} />} />
}
