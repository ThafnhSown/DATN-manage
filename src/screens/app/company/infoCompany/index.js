import { Card, Form, Input, Button, Typography, Row, Col } from 'antd'
import { EditFilled } from '@ant-design/icons'
import { UploadImage } from '../../../../components/layouts/components/UpLoadImage'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { apiGetCompanyInfo } from '../../../../api/services'

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
            <Card title={<Title level={3}>Thông tin hãng xe</Title>} extra={<Button className="w-36 h-14 bg-green-700 text-white text-base font-medium border rounded-xl mt-4" onClick={() => {setChange(false)}} icon={<EditFilled /> }>Chỉnh sửa</Button>}>
                {<div>
                <Form form={form}>
                    <Title level={4}>Logo hãng xe</Title>
                
                    <Row>
                        <Col span={8}>

                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <UploadImage />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={4}>Tên hãng xe</Title>
                            <Form.Item name="name">
                                <Input disabled={change}/>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row className='space-x-4'>
                        <Col span={10}>
                            <Title level={4}>Số hotline đặt vé</Title>
                            <Form.Item name="phoneNumber">
                                <Input disabled={change}/>
                            </Form.Item>
                        </Col>

                        <Col span={10}>
                            <Title level={4}>Email đặt vé</Title>
                            <Form.Item name="email">
                                <Input disabled={change}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={4}>Mật khẩu</Title>
                            <Form.Item name="password">
                                <Input.Password disabled={change}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button htmlType='submit' className="w-30 h-10 bg-green-700 text-white font-extrabold border rounded-xl mt-4">Lưu</Button>
                </Form>
                </div>
                }
            </Card>
        </div>
    )
}

export default InfoCompany