import ImgUpload from '../../../../../components/layouts/components/ImgUpload'
import { apiCreateCoach, apiGetCoaches } from '../../../../../api/services'
import { Form, Row, Input, Select, Button, Col, Typography } from 'antd'
import { useState, useEffect } from 'react' 

const { Title } = Typography

const TransportForm = ({ transport, id }) => {
    const [form] = Form.useForm()
    const [options, setOptions] = useState([])
    const [picture, setPicture] = useState()
    useEffect(() => {
        handleLoadCoach()
        if(transport) {
            form.setFieldValue({...transport})
        }
    }, [])
    const handleUploadPicture = (url) => {
        setPicture(url)
    }
    const handleCreateCoach = async (props) => {
        const res = await apiCreateCoach(props)
        console.log(res)
    }

    async function handleLoadCoach() {
        const res = await apiGetCoaches()
        const listCoach = res.data.data.map((coach) => ({
            label: coach.name,
            value: coach.id
        }))
        setOptions(listCoach)
    }
    return (
        <div>
            <Form
            form={form}
            >
                <Row className='items-center space-x-6'>
                    <Col>
                        <Title level={5}>Hình trong xe</Title>
                        <ImgUpload onImageUpload={handleUploadPicture} imageUrl={picture} setImageUrl={setPicture}/>
                    </Col>
                    <Form.Item name="coachTypeId" >
                        <Select options={options} defaultValue="Chọn loại xe" />
                    </Form.Item>
                    <Form.Item name="vsc">
                        <Input placeholder='Biển số xe'/>
                    </Form.Item>
                    <Form.Item name="phoneNumber">
                        <Input placeholder="Số điện thoại"/>
                    </Form.Item>
                    <Form.Item>
                    <Button onClick={() => {
                        const data = form.getFieldsValue()
                        handleCreateCoach({...data, picture: picture, coachCompanyId: id})
                    }}>Cập nhật</Button>
                    </Form.Item>
                    
                </Row>
            </Form>
        </div>
    )
}

export default TransportForm