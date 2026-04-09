import { AppHeader } from '@/components/app-header/app-header'
import { ProfileData } from '@/components/profileData/profileData'
import ProfileOrders from '@/components/profileOrders/profileOrders'
import { ProtectedRoute } from '@/components/protectedRoute/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '@/hooks/socketHooks'
import { checkUserAuthThunk, loadIngredientList } from '@/services/tasks/action'
import { selectIngredientsStatus } from '@/services/tasks/ingredientSlice'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import FeedPage from '../FeedPage'
import { ForgotPasswordPage } from '../ForgotPasswordPage'
import { Home } from '../Home'
import { IngredientPage } from '../IngredientPage'
import { LoginPage } from '../LoginPage'
import { NotFoundPage } from '../NotFoundPage'
import { OrderBoxDetailsPage } from '../OrderBoxDetailsPage'
import { ProfilePage } from '../ProfilePage'
import { RegisterPage } from '../RegisterPage'
import { ResetPasswordPage } from '../ResetPasswordPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppHeader />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: 'ingredients/:id',
            element: <IngredientPage />,
          },
        ],
      },
      /*
      {
        path: 'ingredients/:id',
        element: <IngredientPage />,
      },
      |
      {
        path: 'feed/:id',
        element: <OrderBoxDetailsPage />,
      },
      */
      {
        path: '/register',
        element: (
          <ProtectedRoute valueForRedirect={false}>
            <RegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute valueForRedirect={false}>
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <ProtectedRoute valueForRedirect={false}>
            <ForgotPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <ProtectedRoute valueForRedirect={false}>
            <ResetPasswordPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute valueForRedirect={true}>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <ProfileData />,
          },
          {
            path: 'orders',
            element: <ProfileOrders />,
            children: [
              {
                path: ':id',
                element: <OrderBoxDetailsPage />,
              },
            ],
          },
        ],
      },
      /*
      {
        path: 'profile/orders/:id',
        element: <OrderBoxDetailsPage />,
      },
      */
      {
        path: '/feed',
        element: <FeedPage />,
        children: [
          {
            path: ':id',
            element: <OrderBoxDetailsPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default function App(): React.JSX.Element {
  const dispatch = useAppDispatch()

  const ingredientsStatus = useAppSelector(selectIngredientsStatus)
  useEffect(() => {
    if (ingredientsStatus === 'idle') {
      void dispatch(loadIngredientList())
    }
  }, [ingredientsStatus, dispatch])

  useEffect(() => {
    void dispatch(checkUserAuthThunk())
  }, [dispatch])

  return <RouterProvider router={router} />
}
