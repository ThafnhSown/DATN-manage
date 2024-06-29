const { Modal, Form, Row, Col, Input, Typography, DatePicker, Select } = require("antd")
const { Title } = Typography
import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../../../../redux/hook"
import { apiCreateVoucher, apiGetVoucherList } from "../../../../../api/services"
import { VoucherTag } from "./VoucherTag"
import { requestLoadVoucher } from "../../../../../redux/slices/companySlice"

const ModalVoucher = (props) => {
    const dispatch = useAppDispatch()
    const coachRouteId = useAppSelector((state) => state.routeState.currentRoute)
    const companyId = useAppSelector((state) => state.authState.userInfo.id)
    const listVoucher = useAppSelector((state) => state.companyState.listVoucher)
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

    const handleGetVoucherList = async () => {
        dispatch(requestLoadVoucher(companyId))
    }

    const handleCreate = async () => {
        const startTime = form.getFieldValue('applyFrom')
        const endTime = form.getFieldValue('applyTo')
        const data = {...form.getFieldsValue(), applyType: 0, companyId, coachRouteId, applyFrom: startTime.valueOf(), applyTo: endTime.valueOf()}
        const res = await apiCreateVoucher(data)
        if(!res.data.error) {
            // setModalShow(false)
            dispatch(requestLoadVoucher(companyId))
            form.resetFields()
        }
    }
    useEffect(() => {
        handleGetVoucherList()
    }, [])

    return (
        <Modal
        open={modalShow}
        onOk={handleCreate}
        onCancel={() => setModalShow(false)}
        width={700}
        >
        <div className="flex flex-row">
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
                <hr className="w-0.5 h-96 bg-[#F3F3F3] mx-2"/>
                <div>
                    <Title level={3}>Danh sách Voucher</Title>
                    <div className="flex flex-col space-y-2">
                        {listVoucher.length ? listVoucher.map(voucher => (<>
                            <VoucherTag {...voucher}/>
                        </>)) : null}
                    </div>
                </div>
        </div>
           
        </Modal>
    )

}

export default ModalVoucher