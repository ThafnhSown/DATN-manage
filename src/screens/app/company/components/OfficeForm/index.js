
import { apiCreateCompany, apiCreateOffice, apiGetListDistrict, apiGetListProvince } from "../../../../../api/services"
import {
    Form, Input, Col, Row, Card, Typography, Button, Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { UploadImage } from '../../../../../components/layouts/components/UpLoadImage'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestCreateOffice, requestLoadListOffice } from "../../../../../redux/slices/officeSlice"
import './style.css'
import OfficeCard from "../OfficeCard"

const { Title } = Typography

const OfficeForm = () => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listOffice = useAppSelector(state => state.officeState.listOffice)
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [modalShow, setModalShow] = useState(false)
    
    async function handleCreateOffice() {
        const data = form.getFieldsValue()
        const payload = {...data, coachCompanyId: companyId}
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
    
    useEffect(() => {
        loadProvince()
        handleLoadOffice()
    }, [])        

    return(
        <>
            <div className="space-y-4">
                <div>
                    <Card title={<Title level={3}>Danh sách văn phòng</Title>} extra={<Button className="w-40 h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mt-4" icon={<PlusOutlined />} onClick={() => {setModalShow(!modalShow)}}>Tạo văn phòng</Button>}>
                        {modalShow && <div>
                                <Form
                                form={form}
                                onFinish={handleCreateOffice}
                                >
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

                                    <Title level={5}>Số điện thoại</Title>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item name="phoneNumber1">
                                                <Input placeholder='Nhập số điện thoại' style={{height: 50}}/>
                                            </Form.Item>
                                        </Col>    
                                    </Row>

                                    <Row>
                                        <Col span={11}>
                                            <Title level={5}>Địa chỉ</Title>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item name="address">
                                                        <Input placeholder='Nhập địa chỉ' style={{height: 50}}/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Title level={5}>Bản đồ</Title>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item name="mapLink">
                                                        <Input placeholder='Nhập liên kết' style={{height: 50}}/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={2}/>
                                        <Col span={11}>
                                            <Form.Item name="picture">
                                                <Title level={5}>Hình ảnh văn phòng</Title>
                                                <UploadImage />
                                            </Form.Item>
                                        </Col>
                                    </Row>     
                                    <Button className="w-30 h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mt-4" htmlType="submit">Xác nhận</Button>
                                </Form>
                            </div>}
                    </Card>
                </div>
                <div className="space-y-3">
                    {
                        listOffice.map((office) => (
                            <OfficeCard office={office}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default OfficeForm