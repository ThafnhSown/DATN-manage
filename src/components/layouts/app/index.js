import { useAppSelector } from '../../../redux/hook'
import Header from '../components/Header'
import { Navigate, useLocation } from 'react-router'

function AppLayout({ children }) {
  const userInfo = useAppSelector((state) => state.authState.userInfo)
  const location = useLocation()
  const pathName = location.pathname
  if(userInfo && userInfo.role === "ROLE_COMPANY") {
    <Navigate to='/' state={{ from: location }} replace />
  }

  return (
    <div className='flex-col flex'>
      <div className='grid grid-cols-12 mobile:hidden desktop:grid'>
        <div className='col-span-11'>
          <Header />
        </div>
        <div className='col-span-1'></div>
      </div>

      <div className='bg-neutral-200'>
        <div className='max-h-screen'>
          <div className={`${pathName=="/booking" ? '' : 'py-6'} desktop:px-10 bg-neutral-200`}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
