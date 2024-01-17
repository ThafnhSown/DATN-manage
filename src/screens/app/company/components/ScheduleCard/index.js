import { Card, Input, Select, Row, Form, Button, Typography } from 'antd'
import { ClockCircleOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { apiCreateSection, apiGetCoaches, apiGetSection } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { requestCreateSchedule } from '../../../../../redux/slices/scheduleSlice'
import Section from '../Section'

const ScheduleCard = ({schedule, index, firstDate, secondDate, isSub}) => {
    const dispatch = useAppDispatch()
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const [options, setOptions] = useState([])
    const [listSection, setListSection] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        handleLoadCoach()
        if(schedule?.id) {
            handleLoadSection()
        }
        if(schedule) {
            form.setFieldsValue({...schedule})
        }
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

    const handleCreateSchedule = async () => {
        const data = form.getFieldsValue()
        await dispatch(requestCreateSchedule({...data, coachRouteId: currentRoute, type:0}))
    }    

    const handleCreateSubSchedule = async () => {
        const data = form.getFieldsValue()
        await dispatch(requestCreateSchedule({...data, coachRouteId: currentRoute, type:1, startTime: firstDate, endTime: secondDate}))
    }
    
    return (
        <div >
            <Card className='bg-neutral-200 my-6'>
                <Typography.Title level={4}>{(index+1) ? (index < 9 ? `0${index+1}` : `${index+1}`) : null}</Typography.Title>
                <Form
                form={form}
                onFinish={isSub ? handleCreateSubSchedule : handleCreateSchedule}
                >
                <Row className='space-x-4'>
                    <Form.Item name="departureTime">
                        <Input suffix={<ClockCircleOutlined />} style={{width:80}}></Input>
                    </Form.Item>
                   <Form.Item name="coachTypeId">
                        <Select defaultValue="Chọn loại xe" style={{width:290}} options={options}>

                        </Select>
                   </Form.Item>
                    
                    <Form.Item>
                        <Select defaultValue="Chọn lộ trình" style={{width:290}}>

                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="price">
                        <Input suffix="VND" style={{width:200}}></Input>
                    </Form.Item>

                    <Button htmlType='submit' icon={<SaveOutlined />}></Button>
                </Row>
                </Form>
                <div>
                    {
                        listSection.length ? <>{
                            listSection.map((t, index) => <Section section={t} index={index}/> )
                        }</> : null
                    }
                </div>
                {
                    schedule?.id ? <Row style={{color: '#006D38'}} onClick={() => {
                        setListSection([...listSection, {coachScheduleId: schedule.id }])
                        console.log(schedule.id)
                    }}>
                    <PlusCircleOutlined />
                    <p>Thêm chặng</p>
                </Row> : null
                }
            </Card>
        </div>
    )
}

export default ScheduleCard