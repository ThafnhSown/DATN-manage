import { Card, Input, Select, Row, Form, Button, Typography, TimePicker } from 'antd'
import { ClockCircleOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { apiCreateSection, apiGetCoaches, apiGetSection } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import { requestCreateSchedule } from '../../../../../redux/slices/scheduleSlice'
import Section from '../Section'
import { apiGetTravelPathList } from "../../../../../api/services";
const TimeSlotCard = ({schedule, index, firstDate, secondDate, isSub, son, setSon}) => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)
    const [options, setOptions] = useState([])
    const [listSection, setListSection] = useState([])
    const [listTP, setListTP] = useState([])
    const [form] = Form.useForm()
    const [requestList, setRequestList] = useState({})

    useEffect(() => {
        handleLoadCoach()
        if(schedule?.id) {
            handleLoadSection()
        }
        if(schedule) {
            form.setFieldsValue({...schedule})
        }
        handleLoadTP()
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
        await dispatch(requestCreateSchedule({...data, coachRouteId: currentRoute}))
    }    
    async function handleLoadTP() {
        const res = await apiGetTravelPathList(companyId)
        const tmp = res.data.data.map(e => ({
            label: e.detail,
            value: e.id
        }))
        setListTP(tmp)
    }
    
    return (
        <div >
            <Card className='bg-neutral-200 my-6'>
                <Typography.Title level={4}>{(index+1) ? (index < 9 ? `0${index+1}` : `${index+1}`) : null}</Typography.Title>
                <Form
                form={form}
                onValuesChange={() => setRequestList({...form.getFieldsValue()})}
                >
                <Row className='space-x-4'>
                    <Form.Item name="departureTime">
                        <TimePicker format="HH:mm" placeholder="Nhập giờ"/>
                    </Form.Item>
                   <Form.Item name="coachTypeId">
                        <Select defaultValue="Chọn loại xe" style={{width:290}} options={options}>

                        </Select>
                   </Form.Item>
                    
                    <Form.Item name="travelPathId">
                        <Select defaultValue="Chọn lộ trình" style={{width:290}} options={listTP}>

                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="price">
                        <Input suffix="VND" style={{width:200}}></Input>
                    </Form.Item>
                </Row>
                </Form>
                <div>
                    {
                        listSection.length ? <>{
                            listSection.map((t, index) => <Section section={t} index={index} listSection={listSection} requestList={requestList} setRequestList={setRequestList}/> )
                        }</> : null
                    }
                </div>
                {
                    <p onClick={() => {
                        setListSection([...listSection, {}])
                    }} style={{color: '#006D38'}}><PlusCircleOutlined />Thêm chặng</p>
                }
                <Button
                    onClick={() => console.log(requestList)}
                >son</Button>
            </Card>
        </div>
    )
}

export default TimeSlotCard