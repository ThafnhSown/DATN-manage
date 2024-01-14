import useRoles from '../hooks/useRoles'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireAuth = ({ allowedRoles }) => {
  const role = useRoles()
  const location = useLocation()

  return role !== null ? (allowedRoles.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to='/' state={{ from: location }} replace />
    ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth