import { Card, Input, Select, Row, Form, Button, Typography, TimePicker, InputNumber } from 'antd'
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons'
import { apiGetCoaches, apiGetSection, apiUpdateTimeslot } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import Section from '../Section'
import dayjs from 'dayjs'
const TimeSlotCard = ({schedule, index, listTimeSlot, setListTimeSlot, isEdit, setIsEdit}) => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const listPath = useAppSelector(state => state.routeState.listPath)
    const listCoach = useAppSelector((state) => state.companyState.listCoach)
    const [listTP, setListTP] = useState([])
    const [options, setOptions] = useState([])
    const [listSection, setListSection] = useState([])
    const [form] = Form.useForm()
    const [time, setTime] = useState(0)
    useEffect(() => {
        let lc = listCoach.map((coach) => ({
            value: coach.coachType.id,
            label: coach.coachType.name
        }))
        setOptions(lc)
        if(schedule?.id) {
            handleLoadSection()
        }
        if(schedule.id) {
            form.setFieldsValue({...schedule})
            form.setFieldValue("departureTime", dayjs(schedule.departureTime))
            form.setFieldValue("coachTypeId", schedule.coachType.id)
            form.setFieldValue("travelPathId", schedule.travelPath.id)
        }
        const tmp = listPath.map(p => ({
            value: p.id,
            label: p.name
        }))
        setListTP(tmp)
    }, [isEdit])

    async function handleLoadSection () {
        const res = await apiGetSection(schedule.id)
        setListSection([...res.data.data])
    }
    const handleChooseTime = (e) => {
        setTime(e.valueOf())
    }

    const handleUpdateTimeslot = async () => {
        const data = {...form.getFieldsValue(), departureTime: time}
        const res = await apiUpdateTimeslot(data)
    } 

    return (
        <div >
            <Card className='bg-neutral-200 my-6'>
                <Typography.Title level={4}>{(index+1) ? (index < 9 ? `0${index+1}` : `${index+1}`) : null}</Typography.Title>
                <Form
                form={form}
                onValuesChange={() => {
                    !isEdit ? listTimeSlot[index] = ({...form.getFieldsValue(), departureTime: time}) : null
                }}
                >
                <Row className='space-x-4'>
                    <Form.Item name="departureTime">
                        <TimePicker format="HH:mm" placeholder="Nhập giờ" onChange={(e) => handleChooseTime(e)}/>
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
                <Form.Item name="id" className='hidden'/>
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
                <div className='flex flex-row justify-center'>
                    {
                        isEdit && <Button onClick={() => handleUpdateTimeslot()}>Hoàn thành</Button>
                    }
                </div>
           
            </Card>
        </div>
    )
}

export default TimeSlotCard