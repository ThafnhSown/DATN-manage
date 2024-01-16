import {
    Form, Input, Row, Card, Typography, Button, Col
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title } = Typography
const { TextArea } = Input
const PolicyForm = () => {
    const [modalShow, setModalShow] = useState(false)
    return(
        <>
            <div>
                <div>
                    <Card title={<Title level={4}>Chính sách</Title>} extra={<Button className="w-40 h-10 text-white font-medium border rounded-xl" icon={<PlusOutlined />} onClick={() => {setModalShow(!modalShow)}}>Tạo chính sách</Button>}>   
                        {modalShow && <div>
                                <Form
                                title='Tạo chính sách'
                                >
                                    <Title level={4}>Tạo chính sách</Title>

                                    <Title level={5}>Tên chính sách</Title>
                                    <Row>
                                        <Col>
                                        <Form.Item>
                                            <Input placeholder='Nhập tên chính sách' style={{height: 50, width: 900}}/>
                                        </Form.Item>
                                        </Col>
                                        
                                    </Row>

                                    <Title level={5}>Nội dung</Title>
                                    <Row>
                                        <Col>
                                        <Form.Item>
                                            <TextArea placeholder='Nhập nội dung' style={{height: 100, width: 900}}/>
                                        </Form.Item>
                                        </Col>
                                       
                                    </Row>
                                    <Button className="w-30 h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mt-4" htmlType='submit'>Xác nhận</Button>
                                </Form>
                            </div>}
                    </Card>
                </div>
            </div>
        </>
    )
}

export default PolicyForm