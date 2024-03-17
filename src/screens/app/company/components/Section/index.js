import { Row, Input, Select, Typography, Form, TimePicker, Button, InputNumber } from 'antd'
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
        if(section.id) {
            form.setFieldsValue({...section})
            form.setFieldValue("departureTime", dayjs(section.departureTime))
        }

    }, [currentRoute])
    const handleChooseTime = (e) => {
        setTime(e.valueOf())
    }
    return (
            <Form
              form={form}
              onValuesChange={() => {
                listSection[index] = {...form.getFieldsValue(), departureTime: time}
                listTimeSlot[timeSlotIndex].sectionList = listSection
            }}
            >
            <Row className='space-x-4 grid grid-cols-12'>
            <Typography.Title level={5} className='col-span-1'>{(index+1) ? (index < 9 ? `Chặng 0${index+1}` : `Chặng ${index+1}`) : null}</Typography.Title>
            <Form.Item name="departureTime" className='col-span-2'>
                <TimePicker format="HH:mm" placeholder="Nhập giờ" onChange={(e) => handleChooseTime(e)}/>
            </Form.Item>
            <Form.Item name="pickUpPointIdList" className='col-span-3'>
                <Select className='w-full' mode="multiple">
                    {
                        optionsListPoint.map(({label, value}) => (
                            <Select.Option key={value} value={value}>
                                {label}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item name="dropOffPointIdList" className='col-span-3'>
                <Select options={optionsListPoint} className='w-full' mode="multiple"></Select>
            </Form.Item>
            <Form.Item name="price" className='col-span-2'>
                <InputNumber suffix="VND" type="number" className='w-full'></InputNumber>
            </Form.Item>
            <Form.Item>
            <Button className="del-btn" onClick={(e) => {
                console.log(index)
                listSection.splice(index, 1);
                setListSection([...listSection])
            }} icon={<DeleteFilled />} />
            </Form.Item>

            </Row>
            </Form>

    )
}

export default Section