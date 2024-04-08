import { requestLogin } from "../../../redux/slices/authSlice"
import { useAppDispatch, useAppSelector} from "../../../redux/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Input, Button, Checkbox, Row } from 'antd'
import { LockFilled, MailFilled } from '@ant-design/icons' 
import background from "../../../assets/background-login.png"
import logo from "../../../assets/logo.png"
import { requestLoadProvince } from "../../../redux/slices/globalSlice";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

export const LoginScreen = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.authState)
    const isError = useAppSelector(state => state.authState.isError)
    const handleLogin = async (data) => {
        try {
            const result = await dispatch(requestLogin({
                username: data.username,
                password: data.password
            }))
            const res = unwrapResult(result);
            const userInfo = res.data
            if(res.error == 0) {
              if(userInfo.role.includes("ROLE_MODERATOR_EMPLOYEE")) {
                navigate("/")
              } else if(userInfo.role.includes("ROLE_COMPANY") || userInfo.role.includes("ROLE_SELLER_EMPLOYEE")) {
                 navigate("/booking") 
              }
              await dispatch(requestLoadProvince())
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
      <div className="flex">
        <div className="w-3/4 h-screen items-center justify-center mobile:hidden desktop:flex">
          <img src={background} alt="background" className="max-h-full max-w-full"/>
        </div>

        <div className="w-1/4 p-4 flex flex-col items-center justify-center h-screen mobile:w-full desktop:flex">
          <div>
          <img src={logo} alt="logo" height='100vh'/>
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
            {
              isError && <p className="text-red-700">Tài khoản/ mật khẩu của quý khách không hợp lệ. Vui lòng thử lại.</p>
            }
          </Form>
          </div>
        </div>
        
      </div>
        
    )
}