import { Row, Input, Select, Typography, Form, Button } from 'antd'
import { SaveOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { apiGetRouteDetail, apiCreateSection } from '../../../../../api/services'
import { useState, useEffect } from 'react'

const Section = ({section, index}) => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const [listPoint, setListPoint] = useState([])
    useEffect(() => {
        handleLoadPoint(currentRoute)
        if(section) {
            form.setFieldsValue({...section})
        }
    }, [currentRoute])

    async function handleLoadPoint(id) {
        const res = await apiGetRouteDetail(id)
        const tmp = res.data.data.pointList.map(point => ({
            label: point.address,
            value: point.id
        }))
        setListPoint(tmp)
    }
    const handleCreateSection = async (data) => {
        const res = await apiCreateSection(data)
        console.log(res)
    }
    return (
            <Form
              form={form}
            >
            <Row className='space-x-4'>
            <Typography.Title level={5}>{(index+1) ? (index < 9 ? `Chặng 0${index+1}` : `Chặng ${index+1}`) : null}</Typography.Title>
            <Form.Item name="departureTime">
                <Input suffix={<ClockCircleOutlined />} style={{width:80}}></Input>
            </Form.Item>
            <Form.Item name="pickUpPointId">
                <Select options={listPoint} style={{width: 249}}></Select>
            </Form.Item>
            <Form.Item name="dropOffPointId">
                <Select options={listPoint} style={{width: 249}}></Select>
            </Form.Item>
            <Form.Item name="price">
                <Input suffix="VND" style={{width:200}}></Input>
            </Form.Item>
            <Form.Item>
                <Button icon={<SaveOutlined />} onClick={() => {
                    const data = form.getFieldsValue()
                    handleCreateSection({...data, coachScheduleId: section.coachScheduleId})
                }}></Button>
            </Form.Item>
            </Row>
            </Form>

    )
}

export default Section