import AdminLayout from '../../../components/layouts/admin'
import RequireAuth from '../../../routes/requireAuth'
import { Outlet } from 'react-router'
import { Dashboard } from './dashboard'
import { News } from './news'
import { Report } from './report'
import { ListNews } from './components/ListNews'

export const adminRouteList = [
  {
    path: '/',
    element: (
      <AdminLayout>
        <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
          <Outlet />
        </RequireAuth>
      </AdminLayout>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/news',
    element: (
      <AdminLayout>
        <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
          <Outlet />
        </RequireAuth>
      </AdminLayout>
    ),
    children: [
      {
        path: '',
        element: <News />
      },
      {
        path: 'all',
        element: <ListNews />
      }
    ]
  },
  {
    path: '/report',
    element: (
      <AdminLayout>
        <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
          <Outlet />
        </RequireAuth>
      </AdminLayout>
    ),
    children: [
      {
        path: '',
        element: <Report />
      }
    ]
  }
]
