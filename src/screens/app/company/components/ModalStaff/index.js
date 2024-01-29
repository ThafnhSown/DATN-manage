import { apiCreateStaff, apiDelStaff } from "../../../../../api/services";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { requestLoadStaff } from "../../../../../redux/slices/staffSlice";
import {
    Col, Modal,
    Input, Form,
    Row, Button, Divider, Select
} from "antd";
import { useEffect } from "react";
const roleOptions = [
    {
        label: "Điều hành",
        value: "ROLE_MODERATOR_EMPLOYEE"
    },
    {
        label: "Bán vé",
        value: "ROLE_SELLER_EMPLOYEE" 
    },
    {
        label: "Hàng hóa",
        value: "ROLE_GOODS_EMPLOYEE" 
    },
]


const ModalStaff = (props) => {
    const {currentStaff, setCurrentStaff, modalShow, setModalShow} = props
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    useEffect(() => {
        form.setFieldsValue({
            ...currentStaff
        })
    }, [currentStaff])
    const handleCancel = () => {
        setModalShow(false)
        setCurrentStaff(null)
    }
    async function handleCreateStaff() {
        const data = form.getFieldsValue()
        const res = await apiCreateStaff({...data, companyId: companyId})
        if(!res.error) {
            dispatch(requestLoadStaff(companyId))
        }
        setModalShow(false)
    }

    return (
    <div>
        <Modal
        width="800px"
        destroyOnClose
        open={modalShow}
        onCancel={handleCancel}
        title={currentStaff ? "CHỈNH SỬA THÔNG TIN NHÂN VIÊN" : "THÊM NHÂN VIÊN"}
        centered
        footer={null}
        >
            <Form
            form={form}
            >   
                <Divider />
                <Row gutter={[8, 8]}>
                    <Col span={24} xs={12}>
                        <span>ID</span>
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
                        <span>Họ và tên</span>
                        <Form.Item name="name" rules={[{ required: true }, { whitespace: true}]}>
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
                    <Col span={24} xs={12}>
                        <span>Phân quyền <i>(Có thể chọn nhiều phân quyền)</i>    </span>
                                
                        <Form.Item name="roleList">
                            <Select
                            placeholder="Chọn quyền nhân viên"
                            options={roleOptions}
                            mode="multiple"
                            ></Select>
                        </Form.Item>    
                    </Col>         
                </Row>
                <Row className="space-x-4">
                    <Button className="w-30 h-10 text-white font-medium border rounded-xl" htmlType="submit" onClick={handleCreateStaff}>Lưu</Button>
                    <Button className="w-30 h-10 text-white font-medium border rounded-xl" onClick={handleCancel}>Hủy</Button>
                </Row>
                
            </Form>
        </Modal>
    </div>    
    )
}

export default ModalStaff