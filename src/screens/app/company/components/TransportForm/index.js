import ImgUpload from '../../../../../components/layouts/components/ImgUpload'
import { apiCreateCoach, apiGetCoaches } from '../../../../../api/services'
import { Form, Row, Input, Select, Button, Col, Typography } from 'antd'
import { useState, useEffect } from 'react' 
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { requestLoadCoach } from '../../../../../redux/slices/companySlice'

const { Title } = Typography

const TransportForm = ({ transport, setIsCreate, options }) => {
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.authState.userInfo.id)
    const [form] = Form.useForm()
    const [picture, setPicture] = useState()
    useEffect(() => {
        form.setFieldsValue({...transport})
        setPicture(transport?.picture)
    }, [])
    const handleUploadPicture = (url) => {
        setPicture(url)
    }
    const handleCreateCoach = async (props) => {
        const res = await apiCreateCoach(props)
        if(res.data.error == 0) {
            await dispatch(requestLoadCoach(id))
            setIsCreate(false)
        }
    }
    return (
        <div>
            <Form
            form={form}
            >
                <Row className='items-center space-x-6' grid={24}>
                    <Col span={4}>
                        <Title level={5}>Hình trong xe</Title>
                        <ImgUpload onImageUpload={handleUploadPicture} imageUrl={picture} setImageUrl={setPicture}/>
                    </Col>
                    <Col span={5}>
                    <Form.Item name="coachTypeId">
                        <Select placeholder={transport?.coachType.name ?? "Chọn loại xe"}>
                            {
                                options.map(({label, value}) => (
                                    <Select.Option key={value} value={value}>
                                        {label}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={4}>
                    <Form.Item name="vsc">
                        <Input placeholder='Biển số xe'/>
                    </Form.Item>
                    </Col>
                   <Col span={4}>
                   <Form.Item name="phoneNumber">
                        <Input placeholder="Số điện thoại"/>
                    </Form.Item>
                   </Col>
                    <Col span={4}>
                    <Form.Item>
                    <Button onClick={() => {
                        const data = form.getFieldsValue()
                        handleCreateCoach({...data, picture: picture, coachCompanyId: id})
                    }}>Cập nhật</Button>
                    </Form.Item>
                    </Col>  
                </Row>
            </Form>
        </div>
    )
}

export default TransportForm