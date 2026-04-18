import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import type React from 'react'
type LocationState = {
  from?: string
}

type ProtectedRouteProps = {
  children: React.JSX.Element
  valueForRedirect: boolean
}

export const ProtectedRoute = ({
  children,
  valueForRedirect,
}: ProtectedRouteProps): React.JSX.Element => {
  const isUserAuth = useAuth()
  const location = useLocation()
  const state = location.state as LocationState | null

  if (isUserAuth === valueForRedirect) {
    return <>{children}</>
  }

  if (isUserAuth === true) {
    const from = state?.from ?? '/profile'
    return <Navigate to={from} state={{ from: location }} />
  }

  return <Navigate to="/login" state={{ from: location }} />
}
