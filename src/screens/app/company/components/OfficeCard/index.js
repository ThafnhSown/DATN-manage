import { Card, Typography, Col, Row, Popconfirm, Modal, Form, Input, Select } from "antd"
import { PhoneFilled, EditFilled, DeleteFilled, EnvironmentFilled, PushpinFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { apiDeleteOffice, apiGetLocation, apiGetListDistrict, apiUpdateCoach, apiUpdateOffice } from '../../../../../api/services'
import ImgUpload from '../../../../../components/layouts/components/ImgUpload'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestLoadListOffice } from "../../../../../redux/slices/officeSlice"
import { enqueueSnackbar, useSnackbar } from "notistack"
const { Title } = Typography

const OfficeCard = ({office, index}) => {
    const enqueueSnackbar = useSnackbar()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listProvince = useAppSelector(state => state.globalState.listProvince)
    const [listDistrict, setListDistrict] = useState([])
    const [configAddress, setConfigAddress] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [avatar, setAvatar] = useState(office.logoLink)

    useEffect(() => {
        apiGetLocation(office.location.id).then((res) => {
            setConfigAddress(`${res.data.data.district}, ${res.data.data.province}`)
        })
        if(office.id) {
            loadDistrict(office.location.provinceId)
            form.setFieldsValue({...office})
            form.setFieldValue("locationId", office.location.id)
            form.setFieldValue("provinceId", office.location.provinceId)
        }
    }, [])

    async function loadDistrict(value) {
        if(value) {
            const res = await apiGetListDistrict(value)
            const listD = res.data.data.map(d => ({
                value: d.id,
                label: d.district
            }))
            setListDistrict(listD)
        }  
    }

    async function handleLoadOffice() {
        try {
            await dispatch(requestLoadListOffice(companyId))
        } catch (err) {
            console.log(err)
        }
    }    

    const handleDelOffice = async (id) => {
        const res = await apiDeleteOffice({id: id})
        if(res.data.error == 0) {
            await dispatch(requestLoadListOffice(companyId))
        }
    }

    const handleUpdateOffice = async () => {
        const data = {
            ...form.getFieldsValue(),
            id: office.id,
            picture: avatar
        }
        const res = await apiUpdateOffice(data)
        if(res.data.error == 0) {
            handleLoadOffice()
            setIsEdit(false)
            enqueueSnackbar("Cập nhật thành công", {
                variant: "success"
            })
        }
    }

    const handlUploadAvatar = (url) => {
        setAvatar(url)
    }

    return (
        <>
             <Modal
                title = "Chỉnh sửa văn phòng"
                open={isEdit}
                onCancel={() => setIsEdit(false)}
                onOk={handleUpdateOffice}
            >
                    <Form
                    form={form}
                    >
                        <Row>
                            <Form.Item name="name">
                                <Input />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <Title level={5}>Tỉnh/Thành phố</Title>
                                <Form.Item name="provinceId">
                                    <Select style={{height: 50}} defaultValue="Chọn tỉnh/thành phố" onChange={(value) => loadDistrict(value)}> 
                                        {
                                            listProvince.map(({label, value}) => (
                                                <Select.Option key={value} value={value}>
                                                    {label}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={2}/>
                            <Col span={11}>
                                <Title level={5} style={{fontFamily: 'Quicksand'}}>Quận/Huyện</Title>
                                <Form.Item name="locationId">
                                <Select style={{height: 50}} defaultValue="Chọn quận/huyện">
                                    {
                                         listDistrict.map(({label, value}) => (
                                            <Select.Option key={value} value={value}>
                                                {label}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Title level={5}>{"Địa chỉ (Số nhà/Tên đường/Xã,phường)"}</Title>
                        <Row>
                            <Col span={11}>
                                <Form.Item name="address">
                                    <Input placeholder='Nhập địa chỉ' style={{height: 50}}/>
                                </Form.Item>
                            </Col>    
                        </Row>

                        <Title level={5}>Bản đồ</Title>
                        <Row>
                            <Col span={11}>
                                <Form.Item name="mapLink">
                                    <Input placeholder='Nhập liên kết' style={{height: 50}}/>
                                </Form.Item>
                            </Col>    
                        </Row>

                        <Row>
                            <Col span={11}>
                                <Title level={5}>Số điện thoại</Title>
                                 <Row>
                                    <Col span={24}>
                                        <Form.Item name="phoneNumber1">
                                            <Input placeholder='Nhập số điện thoại' style={{height: 50}}/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Title level={5}>Số điện thoại</Title>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item name="phoneNumber2">
                                            <Input placeholder='Nhập số điện thoại' style={{height: 50}}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}/>
                            <Col span={11}>
                                <Form.Item name="picture">
                                    <Title level={5}>Hình ảnh văn phòng</Title>
                                    <ImgUpload onImageUpload={handlUploadAvatar} imageUrl={avatar} setImageUrl={setAvatar}/>
                                </Form.Item>
                            </Col>
                            </Row>     
                    </Form>
            </Modal>
            <div>
                <Card 
                title={<Title level={4}>{office.name ?? `Văn phòng ${index+1}`}</Title>} 
                extra={<Row className='space-x-3'>
                    <a onClick={() => setIsEdit(true)} className="text-green-700"><EditFilled /> Sửa</a>
                    <Popconfirm title={<p className='text-green-700 font-bold'>Bạn muốn xóa văn phòng này?</p>}
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => handleDelOffice(office.id)}
                            >
                            <a className="text-red-700" ><DeleteFilled /> Xóa</a>
                            </Popconfirm>
                </Row>}>
                    <Row>
                    <Col span={5}>
                        {
                            office.logoLink ? <img src={office.logoLink} className="w-40 h-40"/> : <ImgUpload />
                        }
                    </Col>
                    <Col className='space-y-2'>
                        <Row className="h-4"/>
                        <Row className='text-2xl space-x-1 text-green-700 '>
                            <EnvironmentFilled /> 
                            <p className="text-black">{`${office.address}, ${configAddress}`}</p>
                        </Row>
                        <Row className='text-2xl space-x-1 text-green-700'>
                            <PhoneFilled /> 
                            <p className="text-black">{office.phoneNumber1 && office.phoneNumber2 ? `${office.phoneNumber1}  -  ${office.phoneNumber2}` : `${office.phoneNumber1}`}</p>
                        </Row>
                        <Row className='text-2xl space-x-1 text-green-700'>
                            <PushpinFilled /> 
                            <a className="text-black">{office.mapLink}</a>
                        </Row>
                    </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default OfficeCard