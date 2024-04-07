import useRoles from '../hooks/useRoles'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireAuth = ({ allowedRoles }) => {
  const role = useRoles()
  const location = useLocation()
  const check = role?.some(item => allowedRoles.includes(item))
  return check ? (
      <Outlet />
    ) : (
      <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth