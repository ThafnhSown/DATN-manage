import { apiCreateTravelPath } from "../../../../api/services"
import { Card, Input, Button, Form } from 'antd'
import { useAppSelector } from "../../../../redux/hook"
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

const TravelPath = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const handleCreateTP = async () => {
        const data = form.getFieldsValue()
        const res = await apiCreateTravelPath({...data, coachCompanyId: companyId})
        if(res.error == 0) {
            form.resetFields()
        }
    }
    return (
        <div className="mx-16 space-y-4">
            <div className="bg-white boder rounded-xl h-12 items-center flex flex-row space-x-2">
                <ArrowLeftOutlined onClick={() => navigate("/")}/>
                <p>Tạo lộ trình</p>
            </div>
            <Card>
                <Form
                form={form}
                onFinish={handleCreateTP}
                >
                    <Form.Item name="name" label="Tên lộ trình">
                        <Input placeholder="Nhập tên lộ trình" />
                    </Form.Item>

                    <Form.Item name="detail" label="Lộ trình">
                        <Input placeholder="Nhập lộ trình" />
                    </Form.Item>
                    <Button htmlType='submit'>Xác nhận</Button>
                </Form>
            </Card>
        </div>
    ) 
}

export default TravelPath