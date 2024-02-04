import useRoles from '../hooks/useRoles'
import { Navigate, Outlet, useLocation } from 'react-router'

const RequireAuth = ({ allowedRoles }) => {
  const role = useRoles()
  const location = useLocation()
  const check = role?.map(index => {
    return allowedRoles.includes(index)
  })
  return role !== null ? check ? (
      <Outlet />
    ) : (
      <Navigate to='/' state={{ from: location }} replace />
    ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth