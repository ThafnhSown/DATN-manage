const { Modal, Form, Row, Col, Input, Typography, DatePicker, Select } = require("antd")
const { Title } = Typography
import { useState } from "react"
import { useAppSelector } from "../../../../../redux/hook"

const ModalVoucher = (props) => {
    const coachRouteId = useAppSelector((state) => state.routeState.currentRoute)
    const companyId = useAppSelector((state) => state.authState.userInfo.id)

    const [form] = Form.useForm()
    const { modalShow, setModalShow } = props
    const [type, setType] = useState(0)
    const option = [
        {
            label: "Giảm giá theo %",
            value: 1
        },
        {
            label: "Giảm giá theo giá trị",
            value: 0
        }
       
    ]

    const handleCreate = () => {
        const data = {...form.getFieldsValue(), applyType: 0, companyId, coachRouteId}
        console.log(data)
    }

    return (
        <Modal
        open={modalShow}
        onOk={handleCreate}
        onCancel={() => setModalShow(false)}
        >
            <Form form={form}>
                <Title level={3}>Tạo voucher</Title>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Tên voucher</Title>
                            <Form.Item name="name">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Title level={5}>Mã Code</Title>
                            <Form.Item name="code">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row> 
                    <Row className='space-x-4'>
                        <Col span={10}>
                            <Title level={5}>Bắt đầu</Title>
                            <Form.Item name="applyFrom">
                                <DatePicker style={{width: "100%"}}/>
                            </Form.Item>
                        </Col>

                        <Col span={10}>
                            <Title level={5}>Kết thúc</Title>
                            <Form.Item name="applyTo">
                                <DatePicker style={{width: "100%"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='space-x-4'>
                        <Col span={10}>
                            <Title level={5}>Kiểu </Title>
                            <Form.Item name="discountType">
                                <Select options={option} defaultValue={0} onChange={(e) => setType(e)}/>
                            </Form.Item>
                        </Col>

                        <Col span={10}>
                            <Title level={5}>Giá trị</Title>
                            <Form.Item name="discount">
                                {
                                    !type ? <Input suffix="VND"/> : <Input suffix="%"/>
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
        </Modal>
    )

}

export default ModalVoucher