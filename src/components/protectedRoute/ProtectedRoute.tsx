import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import type React from 'react'

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

  if (isUserAuth === valueForRedirect) {
    return <>{children}</>
  } else if (isUserAuth === true) {
    return <Navigate to="/profile" state={{ from: location }} />
  } else {
    return <Navigate to="/login" state={{ from: location }} />
  }
}
