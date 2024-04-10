import { Row, Select, Typography, Form, TimePicker, Button, Input } from 'antd'
import { useAppSelector } from '../../../../../redux/hook'
import { useEffect, useState } from 'react'
import { DeleteFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { regexNumber } from '../../../../../utils/convertTime'

const Section = ({section, index, listSection, setListSection, listTimeslot, timeslotIndex}) => {
    const [time, setTime] = useState(0)
    const [form] = Form.useForm()
    const optionsListPoint = useAppSelector(state => state.routeState.currentListPoint)

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(section)
        if(section.price) {
            form.setFieldValue('price', regexNumber(section.price))
        }
        if(section.departureTime) {
            form.setFieldValue("departureTime", dayjs(section.departureTime))
            setTime(section.departureTime)
        } else {
            form.setFieldValue("departureTime")
        }

    }, [section])
    const handleChooseTime = (e) => {
        setTime(e.valueOf())
    }
    return (
            <Form
              form={form}
              onValuesChange={() => {
                listSection[index] = {...form.getFieldsValue(), departureTime: time}
                listTimeslot[timeslotIndex].sectionList = listSection
            }}
            >
            <Row className='space-x-1 grid grid-cols-12'>
            <Typography.Title level={5} className='col-span-1'>{(index+1) ? (index < 9 ? `Chặng 0${index+1}` : `Chặng ${index+1}`) : null}</Typography.Title>
            <Form.Item name="departureTime" className='col-span-1'>
                <TimePicker showNow={false} needConfirm={false}  format="HH:mm" placeholder="Giờ" onChange={(e) => handleChooseTime(e)}/>
            </Form.Item>
            <Form.Item name="pickUpPointIdList" className='col-span-3'>
                <Select className='w-full' mode="multiple" maxTagCount={1}>
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
                <Select maxTagCount={1} options={optionsListPoint} className='w-full' mode="multiple"></Select>
            </Form.Item>
            <Form.Item name="price" className='col-span-2'>
                <Input onBlur={(e) => {
                    const tmp = e.target.value
                    if(tmp) form.setFieldValue('price', regexNumber(tmp))
                }} suffix="VND" className='w-full'></Input>
            </Form.Item>
            <Form.Item className='col-span-1'>
            <Button className="del-btn" onClick={(e) => {
                listSection.splice(index, 1);
                setListSection([...listSection])
            }} icon={<DeleteFilled />} />
            </Form.Item>

            </Row>
            </Form>
    )
}

export default Section