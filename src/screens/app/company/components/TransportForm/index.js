import ImgUpload from '../../../../../components/layouts/components/ImgUpload'
import { apiCreateCoach, apiDelCoach, apiUpdateCoach } from '../../../../../api/services'
import { Form, Row, Input, Select, Button, Col, Typography, Popconfirm, Card } from 'antd'
import { useState, useEffect } from 'react' 
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { requestLoadCoach, deleteCoach, requestCreateCoach } from '../../../../../redux/slices/companySlice'
import { useSnackbar } from 'notistack'
import { unwrapResult } from '@reduxjs/toolkit'

const { Title } = Typography

const TransportForm = ({ transport, setIsCreate, options }) => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.authState.userInfo.id)
    const [form] = Form.useForm()
    const [picture, setPicture] = useState()
    const [coachType, setCoachType] = useState()
    const [vsc, setVsc] = useState()
    const [phone, setPhone] = useState()
    useEffect(() => {
        if(transport) {
            setPicture(transport?.picture)
            setVsc(transport.vsc)
            setPhone(transport.phoneNumber)
            setCoachType(transport.coachType.id)
        }
    }, [])
    const handleUploadPicture = (url) => {
        setPicture(url)
    }
    const handleCreateCoach = async (props) => {
        const res = await dispatch(requestCreateCoach(props))
        const tmp = await unwrapResult(res)
        if(tmp.error == 0) {
            enqueueSnackbar("Tạo thành công !", {
                variant: "success"
            })
            await dispatch(requestLoadCoach(id))
            setIsCreate(false)
        }
    }
    const handleDelCoach = async (coachId) => {
        const res = await apiDelCoach({id: coachId})
        if(res.data.error == 0) {
            enqueueSnackbar("Xóa thành công !", {
                variant: "success"
            })
            await dispatch(deleteCoach(coachId))
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
        <Card>
            {
                !transport ? 
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
    
                        }}>Hoàn thành</Button>
                        </Form.Item>
    
                        </Col>  
                    </Row>
                </Form>
                : <div>
                    <Row className='items-center space-x-6' grid={24}>   
                        <Col span={4}>
                            <Title level={5}>Hình trong xe</Title>
                            {
                               transport.picture ? <img src={transport.picture} className='w-40 h-40'/> : <ImgUpload onImageUpload={handleUploadPicture} imageUrl={picture} setImageUrl={setPicture}/>
                            }
                        </Col>
                        <Col span={5}>
                            <Select value={transport?.coachType.name ?? "Chọn loại xe"} onChange={(value) => setCoachType(value)} className='w-full'>
                                {
                                    options.map(({label, value}) => (
                                        <Select.Option key={value} value={value}>
                                            {label}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Col>
                        <Col span={4}>
                            <Input value={transport.vsc} onChange={(e) => setVsc(e.target.value)}/>
                        </Col>
                       <Col span={4}>
                            <Input value={transport.phoneNumber} onChange={(e) => setPhone(e.target.value)}/>
                       </Col>
                        <Col span={4}>
                        <Button onClick={() => {
                           handleUpdateCoach({
                            picture: picture,
                            coachTypeId: coachType,
                            vsc: vsc,
                            phoneNumber: phone,
                            id: transport.id
                        })
    
                        }}>Cập nhật</Button>
                        {
                           <Popconfirm title={<p className='text-green-700 font-bold'>Bạn muốn xóa xe này?</p>}
                            okText="Có"
                            cancelText="Không"
                            okButtonProps={okButtonProps}
                            onConfirm={() => handleDelCoach(transport.id)}
                            >
                            <Button className='del-btn'>Xóa</Button>
                        </Popconfirm>
                        }
                        </Col>  
                    </Row>
                </div>
            }
         
        </Card>
    )
}

export default TransportForm