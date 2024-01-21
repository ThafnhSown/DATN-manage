import { Card, Form, Input, Button, Typography, Row, Col } from 'antd'
import { EditFilled } from '@ant-design/icons'
import ImgUpload from '../../../../components/layouts/components/ImgUpload'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { apiGetCompanyInfo } from '../../../../api/services'
import './style.css'

const { Title } = Typography

const InfoCompany = () => {
    const [form] = Form.useForm()
    const [change, setChange] = useState(true)
    const [loading, setLoading] = useState(true)
    const loadCompanyInfo = async () => {
        const res = await apiGetCompanyInfo()
        form.setFieldsValue({...res.data.data}) 
    }
    
    useEffect(() => {
        loadCompanyInfo()
    }, [])

    return (
        <div className='px-24'>
            <Card title={<Title level={4}>Thông tin hãng xe</Title>} extra={<Button className="text-white hover:bg-white text-base font-medium border rounded-md" onClick={() => {setChange(false)}} icon={<EditFilled /> }>Chỉnh sửa</Button>}>
                {<div>
                <Form form={form}>
                    <Title level={5}>Logo hãng xe</Title>
                
                    <Row>
                        <Col span={9}>

                        </Col>
                        <Col span={7}>
                            <Form.Item>
                                <ImgUpload isAvatar={true}/>
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
                            <Form.Item name="phoneNumber">
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
                    <Button htmlType='submit' className="bg-green-700 text-white hover:bg-white border rounded-md">Lưu</Button>
                </Form>
                </div>
                }
            </Card>
        </div>
    )
}

export default InfoCompany