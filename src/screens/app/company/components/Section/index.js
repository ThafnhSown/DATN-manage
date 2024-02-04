import { Row, Input, Select, Typography, Form, TimePicker, Button } from 'antd'
import { useAppSelector } from '../../../../../redux/hook'
import { useEffect, useState } from 'react'
import { DeleteFilled } from '@ant-design/icons'
import dayjs from 'dayjs'

const Section = ({section, index, listSection, setListSection, listTimeSlot, timeSlotIndex}) => {
    const [time, setTime] = useState(0)
    const [form] = Form.useForm()
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const listPoint = useAppSelector(state => state.routeState.currentListPoint)
    let optionsListPoint = listPoint.map(point => ({
        value: point.id,
        label: point.address
    }))

    useEffect(() => {
        if(section) {
            form.setFieldsValue({...section})
            form.setFieldValue("departureTime", dayjs(section.departureTime))
        }

    }, [currentRoute])
    const handleChooseTime = (e) => {
        const data = (e.$H * 3600 + e.$m * 60) * 1000
        setTime(data)
    }
    return (
            <Form
              form={form}
              onValuesChange={() => {
                listSection[index] = {...form.getFieldsValue(), departureTime: time}
                listTimeSlot[timeSlotIndex].sectionRequestList = listSection
            }}
            >
            <Row className='space-x-4'>
            <Typography.Title level={5}>{(index+1) ? (index < 9 ? `Chặng 0${index+1}` : `Chặng ${index+1}`) : null}</Typography.Title>
            <Form.Item name="departureTime">
                <TimePicker format="HH:mm" placeholder="Nhập giờ" onChange={handleChooseTime}/>
            </Form.Item>
            <Form.Item name="pickUpPointId">
                <Select options={optionsListPoint} style={{width: 218}}></Select>
            </Form.Item>
            <Form.Item name="dropOffPointId">
                <Select options={optionsListPoint} style={{width: 218}}></Select>
            </Form.Item>
            <Form.Item name="price">
                <Input suffix="VND" style={{width:200}} type="number"></Input>
            </Form.Item>
            <Button className="del-btn" onClick={() => {
                listSection.splice(index, 1);
                setListSection([...listSection])
            }} icon={<DeleteFilled />} />
            </Row>
            </Form>

    )
}

export default Section