import { Link } from 'react-router-dom'
import logo from '../../../../assets/logo.png'
// import AvatarDropdown from '../AvatarDropdown'
import { requestLogout } from '../../../../redux/slices/authSlice'
import { useAppDispatch } from '../../../../redux/hook'
import Cookies from 'js-cookie'
import { Button } from 'antd'

function AdminHeader() {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
      dispatch(requestLogout())
      Cookies.remove("x-access-token")
    }
  return (
      <div className='flex-row h-20 grid grid-cols-10'>
          <div className='flex flex-row items-center col-span-2'>
            <img src={logo}/>
          </div>
          <div className='col-span-4'/>
          <div className='flex flex-row items-center col-span-4'>
            <Link to="/" className='font-bold hover:text-green-600 text-xl px-8'>
                Thông tin hãng xe
            </Link>
            <Link to="/news" className='font-bold hover:text-green-600 text-xl px-8'>
                Đăng bài
            </Link>
            <Link to="/report" className='font-bold hover:text-green-600 text-xl px-8'>
                Báo cáo
            </Link>
            {/* <AvatarDropdown /> */}
            <div className='col-span-1'>
              <Button onClick={handleLogout}>log out</Button>
            </div>
          </div>
      </div>
  )
}

export default AdminHeader
