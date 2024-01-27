
import { apiCreateOffice, apiGetListDistrict, apiGetListProvince } from "../../../../../api/services"
import {
    Form, Input, Col, Row, Card, Typography, Button, Select
} from 'antd'
import { PlusOutlined, ArrowLeftOutlined, EditFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestCreateOffice, requestLoadListOffice } from "../../../../../redux/slices/officeSlice"
import OfficeCard from "../OfficeCard"
import ImgUpload from "../../../../../components/layouts/components/ImgUpload"
import { useNavigate } from 'react-router'
import './style.css'

const { Title } = Typography

const OfficeForm = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listOffice = useAppSelector(state => state.officeState.listOffice)
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [avatar, setAvatar] = useState()
    const [changeName, setChangeName] = useState(false)
    
    async function handleCreateOffice() {
        const data = form.getFieldsValue()
        if(data.name == null) {
            data.name = 'Văn phòng'
        }
        const payload = {...data, coachCompanyId: companyId, picture: avatar}
        const res = await apiCreateOffice(payload)
        if(res.data.error == 0) {
            handleLoadOffice()
        }
    }

    async function handleLoadOffice() {
        try {
            await dispatch(requestLoadListOffice(companyId))
        } catch (err) {
            console.log(err)
        }
    }

    async function loadProvince() {
        const res = await apiGetListProvince()
        const listP = res.data.data.map((p) => ({
            value: p.id,
            label: p.province
        }))
        setListProvince(listP)
    }
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
    const handlUploadAvatar = (url) => {
        setAvatar(url)
    }
    
    useEffect(() => {
        loadProvince()
        handleLoadOffice()
    }, [])        

    return(
        <>
            <div className="space-y-4 mx-16">
                <div>
                    <Card title={
                        <div className="flex flex-row space-x-2 items-center">
                            <ArrowLeftOutlined onClick={() => navigate("/")} className="mb-3"/>
                            <Title level={4}>Danh sách văn phòng</Title>
                        </div>
                        
                        } 
                        extra={<Button className="w-40 h-10 text-white font-medium border rounded-xl mt-4" icon={<PlusOutlined />} onClick={() => {setModalShow(!modalShow)}}>Tạo văn phòng</Button>}>
                        {modalShow && <div className="mt-4">
                                <Form
                                form={form}
                                onFinish={handleCreateOffice}
                                >
                                    <Row className="space-x-2">
                                        {
                                            changeName ? <Form.Item name="name">
                                                <Input placeholder="Tạo văn phòng"/>
                                            </Form.Item> :  <Title level={4}>Tên văn phòng</Title>
                                        }
                                        <div onClick={() => setChangeName(!changeName)} className="mt-1 text-green-900">
                                            <EditFilled/> Sửa tên văn phòng
                                        </div>
                                       
                                    </Row>
                                    <Row>
                                        <Col span={11}>
                                            <Title level={5}>Tỉnh/Thành phố</Title>
                                            <Form.Item>
                                               <Select options={listProvince} style={{height: 50}} defaultValue="Chọn tỉnh/thành phố" onChange={(value) => loadDistrict(value)} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}/>
                                        <Col span={11}>
                                            <Title level={5} style={{fontFamily: 'Quicksand'}}>Quận/Huyện</Title>
                                            <Form.Item name="locationId">
                                            <Select options={listDistrict} style={{height: 50}} defaultValue="Chọn quận/huyện"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Title level={5}>Địa chỉ</Title>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item name="address">
                                                <Input placeholder='Nhập địa chỉ' style={{height: 50, width: 1000}}/>
                                            </Form.Item>
                                        </Col>    
                                    </Row>

                                    <Title level={5}>Bản đồ</Title>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item name="mapLink">
                                                <Input placeholder='Nhập liên kết' style={{height: 50, width: 1000}}/>
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
                                    <Button className="border rounded-xl" htmlType="submit">Xác nhận</Button>
                                </Form>
                            </div>}
                    </Card>
                </div>
                <div className="space-y-3">
                    {
                        listOffice.map((office, index) => (
                            <OfficeCard office={office} index={index}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default OfficeForm