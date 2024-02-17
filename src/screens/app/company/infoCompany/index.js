import { Card, Form, Input, Button, Typography, Row, Col } from 'antd'
import { EditFilled } from '@ant-design/icons'
import ImgUpload from '../../../../components/layouts/components/ImgUpload'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { apiGetCompanyInfo, apiUpdateCompanyInfo } from '../../../../api/services'
import './style.css'
import LoadingPage from '../../../../utils/Loading'
import { requestCompanyInfo } from '../../../../redux/slices/companySlice'
import { unwrapResult } from '@reduxjs/toolkit'

const { Title } = Typography

const InfoCompany = () => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.authState.userInfo.id)
    const isLoading = useAppSelector(state => state.companyState.loading)
    const [change, setChange] = useState(true)
    const [avatar, setAvatar] = useState()
    const loadCompanyInfo = async () => {
        const res = await dispatch(requestCompanyInfo())
        const companyInfo = unwrapResult(res)
        form.setFieldsValue({...companyInfo})
        setAvatar(companyInfo.logo)
    }
    const handlUploadAvatar = (url) => {
        setAvatar(url)
    }
    const handleUpdateCompanyInfo = async () => {
        const data = form.getFieldsValue()
        const res = await apiUpdateCompanyInfo({...data, logo: avatar, id:id })
        setChange(!change)
    }
    useEffect(() => {
        loadCompanyInfo()
    }, [])

    return (
        <div className='px-24'>
            {
                isLoading ? <LoadingPage /> : <Card title={<Title level={4}>Thông tin hãng xe</Title>} extra={<Button className="text-white hover:bg-white text-base font-medium border rounded-md h-8" onClick={() => {change ? handleUpdateCompanyInfo() : setChange(!change)}}>{change ? "Lưu" : <p><EditFilled />Chỉnh sửa</p>}</Button>}>
                {<div>
                <Form form={form}>
                    <Title level={5}>Logo hãng xe</Title>
                
                    <Row>
                        <Col span={9}>

                        </Col>
                        <Col span={7}>
                            <Form.Item>
                                <ImgUpload isAvatar={true} onImageUpload={handlUploadAvatar} imageUrl={avatar} setImageUrl={setAvatar}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Tên hãng xe</Title>
                            <Form.Item name="name">
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row className='space-x-4'>
                        <Col span={10}>
                            <Title level={5}>Số hotline đặt vé</Title>
                            <Form.Item name="hotline">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={10}>
                            <Title level={5}>Email đặt vé</Title>
                            <Form.Item name="email">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Mật khẩu</Title>
                            <Form.Item name="password">
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </div>
                }
            </Card>
            }
        </div>
    )
}

export default InfoCompany