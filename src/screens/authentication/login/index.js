import { requestLogin } from "../../../redux/slices/authSlice"
import { useAppDispatch, useAppSelector} from "../../../redux/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie"
import { Form, Input, Button, Checkbox, Row } from 'antd'
import { LockFilled, MailFilled } from '@ant-design/icons' 
import background from "../../../assets/background-login.png"
import logo from "../../../assets/logo.png"
import { useNavigate } from 'react-router'

export const LoginScreen = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const authState = useAppSelector((state) => state.authState)
    const handleLogin = async (data) => {
        try {
            const result = await dispatch(requestLogin({
                username: data.username,
                password: data.password
            }))
            const res = unwrapResult(result);
            const userInfo = res.data
            const isLoggedIn = res.error
            if(!isLoggedIn) {
              if(userInfo.role === "ROLE_COMPANY") {
                navigate("/")
              }
            }
            Cookies.set("x-access-token", res.data.token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
      <div className="flex">
        <div className="w-1/2">
          <img src={background} alt="background"/>
        </div>

        <div className="w-1/2 p-4 flex flex-col items-center justify-center h-screen">
          <div className="max-h-100">
          <img src={logo} alt="logo" className="mb-4 ml-16"/>
          <b className="text-2xl">Đăng nhập</b>
          <Form 
            initialValues={{ remember: true }}
            onFinish={ handleLogin }
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder="Tài khoản" prefix={<MailFilled />} className="w-80 p-2 border rounded-xl mt-4"/>
            </Form.Item>
    
            <Form.Item
              name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
            >
              <Input.Password placeholder="Mật khẩu" prefix={<LockFilled />} className="w-80 border rounded-xl"/>
            </Form.Item>
            <Row>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              <a className="text-green-700 font-bold ml-12">Quên mật khẩu?</a>
            </Row>
            
    
            <Form.Item>
              <Button htmlType="submit" className="w-80 h-10 bg-green-700 hover:bg-white text-white font-extrabold border rounded-xl mt-4">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          </div>
        </div>
        
      </div>
        
    )
}