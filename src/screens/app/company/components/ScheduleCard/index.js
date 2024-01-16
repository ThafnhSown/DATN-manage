import { Card, Input, Select, Row, Form, Button, Typography } from 'antd'
import { ClockCircleOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { apiCreateSection, apiGetCoaches, apiGetSection } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { requestCreateSchedule } from '../../../../../redux/slices/scheduleSlice'
const ScheduleCard = ({schedule, index}) => {
    const dispatch = useAppDispatch()
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const [options, setOptions] = useState([])
    const [listSection, setListSection] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        handleLoadCoach()
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
        console.log(res)
    }
    const handleCreateSection = async () => {
        const data = {
            coachScheduleId: 3,
            departureTime: "string",
            dropOffPointId: 2,
            pickUpPointId: 1,
            price: 10000
        }
        const res = await apiCreateSection(data)
        console.log(res)
    }

    const handleCreateSchedule = async () => {
        const data = form.getFieldsValue()
        await dispatch(requestCreateSchedule({...data, coachRouteId: currentRoute, type:0}))
    }
    
    return (
        <div >
            <Card className='bg-neutral-200 my-6'>
                <Typography.Title level={4}>{(index+1) ? (index < 9 ? `0${index+1}` : `${index+1}`) : null}</Typography.Title>
                <Form
                form={form}
                onFinish={handleCreateSchedule}
                >
                <Row className='space-x-4'>
                    <Form.Item name="departureTime">
                        <Input suffix={<ClockCircleOutlined />} style={{width:100}}></Input>
                    </Form.Item>
                   <Form.Item name="coachTypeId">
                        <Select defaultValue="Chọn loại xe" style={{width:300}} options={options}>

                        </Select>
                   </Form.Item>
                    
                    <Form.Item>
                        <Select defaultValue="Chọn lộ trình" style={{width:300}}>

                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="price">
                        <Input suffix="VND" style={{width:200}}></Input>
                    </Form.Item>

                    <Button htmlType='submit' icon={<SaveOutlined />}></Button>
                </Row>
                </Form>
                {/* <div>
                    <Row className='space-x-4'>
                        <Typography.Title level={5}>Chặng 01</Typography.Title>
                        <Input suffix={<ClockCircleOutlined />} style={{width:100}}></Input>
                        <Input placeholder='Nhập điểm đón' style={{width:258}}></Input>
                        <Input placeholder='Nhập điểm trả' style={{width:258}}></Input>
                        <Input suffix="VND" style={{width:200}}></Input>
                        <Button icon={<SaveOutlined />} onClick={() => handleCreateSection()}></Button>
                    </Row> 
                </div> */}
                {
                    schedule?.id ? <Row style={{color: '#006D38'}}>
                    <PlusCircleOutlined />
                    <p>Thêm chặng</p>
                </Row> : null
                }
            </Card>
        </div>
    )
}

export default ScheduleCard