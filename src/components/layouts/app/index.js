import { useAppSelector } from '../../../redux/hook'
import Header from '../components/Header'
import { Navigate, useLocation } from 'react-router'

function AppLayout({ children }) {
  const userInfo = useAppSelector((state) => state.authState.userInfo)
  const location = useLocation()
  if(userInfo && userInfo.role === "ROLE_ADMIN") {
    <Navigate to='/' state={{ from: location }} replace />
  }

  return (
    <div className='flex-col flex'>
      <div className='grid grid-cols-12 mb-6'>
        <div className='col-span-1'></div>
        <div className='col-span-10'>
          <Header />
        </div>
        <div className='col-span-1'></div>
      </div>

      <div className='grid grid-cols-12 bg-neutral-200'>
        <div className='min-h-screen col-span-1'></div>
        <div className='min-h-screen col-span-10'>
          <div className='p-8 bg-neutral-200'>{children}</div>
        </div>
        <div className='min-h-screen col-span-1'></div>
      </div>
    </div>
  )
}

export default AppLayout
