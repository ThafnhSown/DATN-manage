import ImgUpload from '../../../../../components/layouts/components/ImgUpload'
import { apiCreateCoach, apiDelCoach, apiGetCoaches, apiUpdateCoach } from '../../../../../api/services'
import { Form, Row, Input, Select, Button, Col, Typography, Popconfirm } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { useState, useEffect } from 'react' 
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { requestLoadCoach } from '../../../../../redux/slices/companySlice'
import { useSnackbar } from 'notistack'

const { Title } = Typography

const TransportForm = ({ transport, setIsCreate, options }) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.authState.userInfo.id)
    const [form] = Form.useForm()
    const [picture, setPicture] = useState()
    useEffect(() => {
        form.setFieldsValue({...transport})
        transport ? form.setFieldValue("coachTypeId", transport.coachType.id) : null
        setPicture(transport?.picture)
    }, [])
    const handleUploadPicture = (url) => {
        setPicture(url)
    }
    const handleCreateCoach = async (props) => {
        const res = await apiCreateCoach(props)
        if(res.data.error == 0) {
            enqueueSnackbar("Tạo thành công !", {
                variant: "success"
            })
            await dispatch(requestLoadCoach(id))
            setIsCreate(false)
        }
    }
    const handleDelCoach = async (coachId) => {
        const res = await apiDelCoach(coachId)
        if(res.data.error == 0) {
            enqueueSnackbar("Xóa thành công !", {
                variant: "success"
            })
            await dispatch(requestLoadCoach(id))
        }
    }

    const handleUpdateCoach = async (data) => {
        const res = await apiUpdateCoach(data)
        if(res.data.error == 0) {
            await dispatch(requestLoadCoach(id))
            enqueueSnackbar("Cập nhật thành công !", {
                variant: "success"
            })
        }
    }
    const okButtonProps = {
        className: 'text-green-700'
    }

    return (
        <div>
            <Form
            form={form}
            >
                <Row className='items-center space-x-6' grid={24}>
                <Form.Item name="id"></Form.Item>

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
                        data.id ? handleUpdateCoach({...data, picture: picture}) : handleCreateCoach({...data, picture: picture, coachCompanyId: id})

                    }}>{transport ? 'Cập nhật' : 'Hoàn thành'}</Button>
                    {
                        transport &&  <Popconfirm title={<p className='text-green-700 font-bold'>Bạn muốn xóa xe này?</p>}
                        okText="Có"
                        cancelText="Không"
                        okButtonProps={okButtonProps}
                        onConfirm={() => handleDelCoach(transport.id)}
                        >
                        <Button>Xóa</Button>
                    </Popconfirm>
                    }
                    </Form.Item>

                    </Col>  
                </Row>
            </Form>
        </div>
    )
}

export default TransportForm