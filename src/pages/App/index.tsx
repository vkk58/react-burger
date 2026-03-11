import { AppHeader } from '@/components/app-header/app-header'
import { ProfileData } from '@/components/profileData/profileData'
import ProfileOrders from '@/components/profileOrders/profileOrders'
import { ProtectedRoute } from '@/components/protectedRoute/ProtectedRoute'
import { checkUserAuthThunk } from '@/services/tasks/action'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import FeedPage from '../FeedPage'
import { ForgotPasswordPage } from '../ForgotPasswordPage'
import { Home } from '../Home'
import { IngredientPage } from '../IngredientPage'
import { LoginPage } from '../LoginPage'
import { NotFoundPage } from '../NotFoundPage'
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
      },
      {
        path: 'ingredients/:id',
        element: <IngredientPage />,
      },
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
          },
        ],
      },
      {
        path: '/feed',
        element: <FeedPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default function App(): React.JSX.Element {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserAuthThunk())
  }, [dispatch])
  return <RouterProvider router={router} />
}
