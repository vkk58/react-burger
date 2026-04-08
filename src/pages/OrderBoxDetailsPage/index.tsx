import { OrderBoxDetails } from '@/components/OrderBoxDetails/orderBoxDetails'
import { useParams } from 'react-router-dom'

export const OrderBoxDetailsPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>()
  return <OrderBoxDetails orderId={id ?? ''} />
}
