import { Card, Input, Select, Row, Form, Button, Typography, TimePicker, InputNumber } from 'antd'
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons'
import { apiDeleteTimeslot, apiGetCoaches, apiGetSection, apiUpdateTimeslot } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import Section from '../Section'
import { useSnackbar } from "notistack"
import dayjs from 'dayjs'
import { regexNumber, convertSecondsToDayjs } from '../../../../../utils/convertTime'
import { UpdateMulti } from '../UpdateMulti'

const TimeSlotCard = ({schedule, index, listTimeSlot, setListTimeSlot, isEdit, setIsEdit, setCurrentTimeslot, scheduleId, limit}) => {
    const { enqueueSnackbar } = useSnackbar()
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
    const [multi, setMulti] = useState(false)
    const [dataMulti, setDataMulti] = useState({})

    useEffect(() => {
        form.resetFields()
        schedule.sectionList ? setListSection(schedule.sectionList) : setListSection([])
        form.setFieldsValue(schedule)
        if(schedule.price) {
            form.setFieldValue('price', regexNumber(schedule.price))
        }
        if(schedule.departureTime) {
            form.setFieldValue("departureTime", convertSecondsToDayjs(schedule.departureTime))
            setTime(schedule.departureTime)
        } else {
            form.setFieldValue("departureTime")
        }
    }, [schedule])

    useEffect(() => {
        let lc = listCoach.map((coach) => ({
            value: coach.id,
            label: `${coach.coachType.name} - ${coach.vsc}`
        }))
        setOptions(lc)
        const tmp = listPath.map(p => ({
            value: p.id,
            label: p.name
        }))
        setListTP(tmp)
    }, [isEdit])

    const handleDeleteTimeslot = async (id) => {
        if(!id) {
            delete listTimeSlot[index]
            setCurrentTimeslot(listTimeSlot[index-1])
            let tmp = listTimeSlot.filter(tl => tl)
            setListTimeSlot([...tmp])
        } else {
            const timeslot = listTimeSlot.filter(item => item.id == id)
            const tmp = {
                coachRouteId: currentRoute,
                id: id,
                departureTime: timeslot[0].departureTime,
                type: 1
            }
            const res = await apiDeleteTimeslot(tmp)
            if(res.data.error == 0) {
                delete listTimeSlot[index]
                setCurrentTimeslot(listTimeSlot[index-1])
                let tmp = listTimeSlot.filter(tl => tl)
                setListTimeSlot([...tmp])
            }
        }
    }

    const handleChooseTime = (e) => {
        setTime((e.$H * 3600 + e.$m * 60) * 1000)
    }

    const handleUpdateTimeslot = async () => {
        const data = {...form.getFieldsValue(), departureTime: time, sectionList: listSection, coachRouteId: currentRoute, type: 1}
        const res = await apiUpdateTimeslot(data)
        if(!res.data.error) {
            enqueueSnackbar("Cập nhật thành công", {
                variant: "success"
            })
            listTimeSlot[index] = data
        }
    } 

    const handleUpdateMulti = async () => {
        const data = {...form.getFieldsValue(), departureTime: time, sectionList: listSection, limit}
        setDataMulti(data)
        console.log(data)
        setMulti(true)
    }

    return (
        <div >
            <Card className='bg-neutral-200 my-6'>
                <Typography.Title level={4}>{(index+1) ? (index < 9 ? `0${index+1}` : `${index+1}`) : null}</Typography.Title>
                <Form
                form={form}
                onValuesChange={() => {
                    listTimeSlot[index] = ({...form.getFieldsValue(), departureTime: time, sectionList: listSection})
                }}
                >
                <Row className='space-x-4 grid grid-cols-12'>
                    <Form.Item name="departureTime" className='col-span-1'>
                        <TimePicker showNow={false} needConfirm={false} format="HH:mm" placeholder="Giờ" onChange={(e) => handleChooseTime(e)} className='w-full'/>
                    </Form.Item>
                   <Form.Item name="coachId" className='col-span-3'>
                        <Select defaultValue="Chọn loại xe" className='w-full'>
                            {
                                options.map(({label, value}) => (
                                    <Select.Option key={value} value={value}>
                                        {label}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                   </Form.Item>
                    
                    <Form.Item name="travelPathId" className='col-span-4'>
                        <Select defaultValue="Chọn lộ trình" className='w-full' options={listTP}>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="price" className='col-span-3'>
                        <Input suffix="VND" className='w-full'
                        ></Input>
                    </Form.Item>
                    
                    <Button className="del-btn" onClick={() => {
                            handleDeleteTimeslot(schedule.id)
                        }} icon={<DeleteFilled />} />
                </Row>
                <Form.Item name="id" className='hidden'/>
                </Form>
                <div>
                    {
                        listSection?.map((t, sectionIndex) => <Section section={t} index={sectionIndex} listSection={listSection} setListSection={setListSection} listTimeslot={listTimeSlot} timeslotIndex={index}/> )
                    }
                </div>
                {
                    <p onClick={() => {
                        setListSection([...listSection, {}])
                    }} style={{color: '#006D38'}} className='w-28'><PlusCircleOutlined />Thêm chặng</p>
                }
                <div className='flex flex-row justify-center space-x-4'>
                    {
                        schedule.id && <Button onClick={() => handleUpdateTimeslot()} className='w-1/6'>Lưu</Button>
                    }
                    {/* {
                        schedule.id && <Button onClick={() => handleUpdateMulti()} className='w-1/6'>Cập nhật tất cả</Button>
                    } */}
                    {
                        multi && <UpdateMulti data={dataMulti} modalShow={multi} setModalShow={setMulti} old={schedule?.departureTime}/>
                    }
                </div>
            </Card>
        </div>
    )
}

export default TimeSlotCard