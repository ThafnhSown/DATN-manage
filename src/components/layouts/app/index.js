import { useAppSelector } from '../../../redux/hook'
import Header from '../components/Header'
import { Navigate, useLocation } from 'react-router'

function AppLayout({ children }) {
  const userInfo = useAppSelector((state) => state.authState.userInfo)
  const location = useLocation()
  if(userInfo && userInfo.role === "ROLE_COMPANY") {
    <Navigate to='/' state={{ from: location }} replace />
  }

  return (
    <div className='flex-col flex'>
      <div className='grid grid-cols-12'>
        <div className='col-span-11'>
          <Header />
        </div>
        <div className='col-span-1'></div>
      </div>

      <div className='bg-neutral-200'>
        <div className='min-h-screen'>
          <div className='py-6 px-2 bg-neutral-200'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout