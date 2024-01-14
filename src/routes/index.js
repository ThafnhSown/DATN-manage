/* eslint-disable react-hooks/exhaustive-deps */
import { AppRouteList } from '../screens/app/appRoute'
import { AuthRouteList } from '../screens/authentication/authRoute'
import { useRoutes } from 'react-router-dom'
import { memo } from 'react'

export const AppRoutes = () => {

  const routes = [...AuthRouteList, ...AppRouteList]
  return useRoutes([...routes])
}

export const WebRoutes = memo(AppRoutes)
