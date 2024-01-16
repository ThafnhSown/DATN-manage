import { Card, Typography, Col, Row } from "antd"
import { PhoneFilled, EditFilled, DeleteFilled, EnvironmentFilled, PushpinFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { apiDeleteOffice, apiGetLocation } from '../../../../../api/services'
import ImgUpload from '../../../../../components/layouts/components/ImgUpload'
const { Title } = Typography
const OfficeCard = ({office}) => {
    const [configAddress, setConfigAddress] = useState()
    useEffect(() => {
        apiGetLocation(office.location.id).then((res) => {
            setConfigAddress(`${res.data.data.district} - ${res.data.data.province}`)
        })
    }, [])

    const handleDelOffice = async (id) => {
        const res = await apiDeleteOffice({id: id})
        console.log(res)
    }
    return (
        <>
            <div>
                <Card 
                title={<Title level={4}>{office.address}</Title>} 
                extra={<Row className='space-x-3'>
                    <div><EditFilled /> Sửa</div>
                    <div onClick={() => handleDelOffice(office.id)}><DeleteFilled /> Xóa</div>
                </Row>}>
                    <Row>
                    <Col span={6}>
                        {
                            office.logoLink ? <img src={office.logoLink} className="w-40 h-auto"/> : <ImgUpload />
                        }
                    </Col>
                    <Col span={2}/>
                    <Col span={9} className='space-y-1'>
                        <Row className='text-xl space-x-1'>
                            <EnvironmentFilled /> <p>{configAddress}</p>
                        </Row>
                        <Row className='text-xl space-x-1'>
                            <PhoneFilled /> <p>{`${office.phoneNumber1}-${office.phoneNumber1}`}</p>
                        </Row>
                        <Row className='text-xl space-x-1'>
                            <PushpinFilled /> <p>{office.mapLink}</p>
                        </Row>
                    </Col>
                    </Row>
                </Card>
            </div>
        </>
    )
}

export default OfficeCard