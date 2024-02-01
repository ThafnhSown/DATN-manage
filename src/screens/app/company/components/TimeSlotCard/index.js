import { Card, Input, Select, Row, Form, Button, Typography, TimePicker, InputNumber } from 'antd'
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons'
import { apiGetCoaches, apiGetSection } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import Section from '../Section'
const TimeSlotCard = ({schedule, index, listTimeSlot, setListTimeSlot}) => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const listPath = useAppSelector(state => state.routeState.listPath)
    const [listTP, setListTP] = useState([])
    const [options, setOptions] = useState([])
    const [listSection, setListSection] = useState([])
    const [form] = Form.useForm()
    const [time, setTime] = useState(0)
    useEffect(() => {
        handleLoadCoach()
        if(schedule?.id) {
            handleLoadSection()
        }
        if(schedule) {
            form.setFieldsValue({...schedule})
        }
        const tmp = listPath.map(p => ({
            value: p.id,
            label: p.detail
        }))
        setListTP(tmp)
    }, [])

    async function handleLoadCoach() {
        const res = await apiGetCoaches()
        const listCoach = res.data.data.map((coach) => ({
            label: coach.name,
            value: coach.id
        }))
        setOptions(listCoach)
    }

    async function handleLoadSection () {
        const res = await apiGetSection(schedule.id)
        setListSection([...res.data.data])
    }
    const handleChooseTime = (e) => {
        const data = (e.$H * 3600 + e.$m * 60) * 1000
        setTime(data)
    }
    return (
        <div >
            <Card className='bg-neutral-200 my-6'>
                <Typography.Title level={4}>{(index+1) ? (index < 9 ? `0${index+1}` : `${index+1}`) : null}</Typography.Title>
                <Form
                form={form}
                onValuesChange={() => {
                    listTimeSlot[index] = ({...form.getFieldsValue(), departureTime: time})
                }}
                >
                <Row className='space-x-4'>
                    <Form.Item name="departureTime">
                        <TimePicker format="HH:mm" placeholder="Nhập giờ" onChange={handleChooseTime}/>
                    </Form.Item>
                   <Form.Item name="coachTypeId">
                        <Select defaultValue="Chọn loại xe" style={{width:260}} options={options}>

                        </Select>
                   </Form.Item>
                    
                    <Form.Item name="travelPathId">
                        <Select defaultValue="Chọn lộ trình" style={{width:260}} options={listTP}>

                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="price">
                        <InputNumber suffix="VND" style={{width:200}} min={0}></InputNumber>
                    </Form.Item>
                    
                    <Button className="del-btn" onClick={() => {
                            listTimeSlot.splice(index, 1);
                            setListTimeSlot([...listTimeSlot])
                        }} icon={<DeleteFilled />} />
                </Row>
                </Form>
                <div>
                    {
                        listSection.length ? <>{
                            listSection.map((t, sectionIndex) => <Section section={t} index={sectionIndex} listSection={listSection} setListSection={setListSection} listTimeSlot={listTimeSlot} timeSlotIndex={index}/> )
                        }</> : null
                    }
                </div>
                {
                    <p onClick={() => {
                        setListSection([...listSection, {}])
                    }} style={{color: '#006D38'}}><PlusCircleOutlined />Thêm chặng</p>
                }
            </Card>
        </div>
    )
}

export default TimeSlotCard