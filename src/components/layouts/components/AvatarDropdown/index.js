import { Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { requestLogout } from '../../../../redux/slices/authSlice'
import { useAppDispatch } from '../../../../redux/hook'
import Cookies from 'js-cookie'

const AvatarDropdown = () => {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        Cookies.remove("x-access-token")
        dispatch(requestLogout())
    }
    const items = [
        {
            key: '1',
            label: (
                <a onClick={handleLogout}>Log Out</a>
            )
        }
    ]
   

    return (
        <>
            <div>
                <Dropdown
                menu={{items}}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar icon={<UserOutlined />} />
                    </a>
                </Dropdown>
                
            </div>
        </>
    )
}

export default AvatarDropdown