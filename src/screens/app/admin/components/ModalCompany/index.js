import { useAppDispatch } from "../../../../../redux/hook";
import { requestCreateCompany } from "../../../../../redux/slices/companySlice";
import { apiCreateCompany, apiUpdateCompany } from "../../../../../api/services";
import {
    Col, Modal,
    Input, Form,
    Row, Button, Divider
} from "antd";
import { useEffect } from "react";
import './style.css'

const ModalCompany = (props) => {
    const {currentCompany, setCurrentCompany, modalShow, setModalShow} = props
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    useEffect(() => {
        form.setFieldsValue({
            ...currentCompany
        })
    }, [currentCompany])
    const handleCancel = () => {
        setModalShow(false)
        setCurrentCompany(null)
    }
    async function handleCreateCompanyAccount() {
        const data = form.getFieldsValue()
        const res = await dispatch(requestCreateCompany(data))
        setModalShow(false)
    }

    async function handleUpdateCompanyAccount() {
        const data = {...form.getFieldsValue(), id: currentCompany.id}
        const res = await apiUpdateCompany(data)
        setModalShow(false)
    }

    return (
    <div>
        <Modal
        width="800px"
        destroyOnClose
        open={modalShow}
        onCancel={handleCancel}
        title={currentCompany ? "CHỈNH SỬA THÔNG TIN HÃNG XE" : "THÊM HÃNG XE"}
        centered
        footer={null}
        >
            <Form
            form={form}
            >   
                <Divider />
                <Row gutter={[8, 8]}>
                    <Col span={24} xs={12}>
                        <span className="font-quicksand">ID</span>
                        <Form.Item name="username">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} xs={12}>
                        <span>Mật khẩu</span>
                        <Form.Item name="password">
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={24} xs={12}>
                        <span>Tên hãng xe</span>
                        <Form.Item name="name" rules={[{ required: true }, { whitespace: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col span={24} xs={12}>
                        <span>Hotline đặt vé</span>
                        <Form.Item name="customId">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[8, 8]}>
                    <Col span={24} xs={12}>
                        <span>Email</span>
                        <Form.Item name="email">
                           
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24} xs={12}>
                        <span>Số điện thoại</span>
                        <Form.Item  name="phoneNumber">
                            <Input />
                        </Form.Item>  
                    </Col>
                </Row>  
                
                <Row>  
                    <Col>
                        <span>Số tiền</span>            
                        <Form.Item name="price">
                            <Input suffix="VND"/>
                        </Form.Item>    
                    </Col>         
                </Row>
                <Row className="space-x-4">
                    <Button className="w-30 h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mt-4" htmlType="submit" onClick={currentCompany?.id ? handleUpdateCompanyAccount : handleCreateCompanyAccount}>Lưu</Button>
                    <Button className="w-30 h-10 bg-green-white hover:bg-green-700 text-green-700 text-base font-medium border rounded-xl mt-4" onClick={handleCancel}>Hủy</Button>
                </Row>
                
            </Form>
        </Modal>
    </div>    
    )
}

export default ModalCompany