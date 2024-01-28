import { Row, Input, Select, Typography, Form, TimePicker } from 'antd'
import { useAppSelector } from '../../../../../redux/hook'
import { useEffect } from 'react'

const Section = ({section, index, listSection, setRequestList, requestList, listTimeSlot}) => {
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
        }

    }, [currentRoute])

    return (
            <Form
              form={form}
              onValuesChange={() => {
                listSection[index] = form.getFieldsValue()
                setRequestList({...requestList, sectionRequestList: listSection})
            }}
            >
            <Row className='space-x-4'>
            <Typography.Title level={5}>{(index+1) ? (index < 9 ? `Chặng 0${index+1}` : `Chặng ${index+1}`) : null}</Typography.Title>
            <Form.Item name="departureTime">
                <TimePicker format="HH:mm" placeholder="Nhập giờ"/>
            </Form.Item>
            <Form.Item name="pickUpPointId">
                <Select options={optionsListPoint} style={{width: 249}}></Select>
            </Form.Item>
            <Form.Item name="dropOffPointId">
                <Select options={optionsListPoint} style={{width: 249}}></Select>
            </Form.Item>
            <Form.Item name="price">
                <Input suffix="VND" style={{width:200}}></Input>
            </Form.Item>
            </Row>
            </Form>

    )
}

export default Section