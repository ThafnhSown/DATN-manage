import PolicyCard from "../components/PolicyCard"
import {
    Form, Input, Row, Card, Typography, Button, Col
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSnackbar } from "notistack"
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { requestCreatePolicy, requestLoadPolicy } from "../../../../redux/slices/companySlice"
const { Title } = Typography
const { TextArea } = Input

const Policy = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.authState.userInfo.id)
    const [modalShow, setModalShow] = useState(false)
    const listPolicy = useAppSelector(state => state.companyState.listPolicy)
    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(requestLoadPolicy(id))
    }, [])

    const handleCreatePolicy = async () => {
        const data = {...form.getFieldsValue(), coachCompanyId: id}
        const res = await dispatch(requestCreatePolicy(data))
        setModalShow(false)
        form.resetFields()
    }
    return (
        <div className="px-24">
            <div>
            <Card title={<Title level={4}>Chính sách</Title>} extra={<Button className="w-40 h-10 text-white font-medium border rounded-xl" icon={<PlusOutlined />} onClick={() => {setModalShow(!modalShow)}}>Tạo chính sách</Button>}>   
                {modalShow && <div>
                        <Form
                        form={form}
                        onFinish={handleCreatePolicy}
                        >
                            <Title level={4}>Tạo chính sách</Title>
                            <Row>
                                <Col>
                                <Form.Item name="name">
                                    <Input placeholder='Nhập tên chính sách' style={{height: 50, width: 900}}/>
                                </Form.Item>
                                </Col>
                                        
                            </Row>

                            <Title level={5}>Nội dung</Title>
                            <Row>
                                <Col>
                                <Form.Item name="content">
                                    <TextArea placeholder='Nhập nội dung' style={{height: 100, width: 900}}/>
                                </Form.Item>
                                </Col>
                                       
                            </Row>
                            <Button className="w-30 h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mt-4" htmlType='submit'>Xác nhận</Button>
                        </Form>
                    </div>}
                </Card>
            </div>

            <div className="mt-6 space-y-2">
                {
                    listPolicy?.map(p => <PolicyCard policy={p}/>)
                }
            </div>
        </div>
    )
}

export default Policy