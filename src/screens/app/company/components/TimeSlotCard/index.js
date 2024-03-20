import { Card, Input, Select, Row, Form, Button, Typography, TimePicker, InputNumber } from 'antd'
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons'
import { apiDeleteTimeslot, apiGetCoaches, apiGetSection, apiUpdateTimeslot } from '../../../../../api/services'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook'
import Section from '../Section'
import { useSnackbar } from "notistack"
import dayjs from 'dayjs'
const TimeSlotCard = ({schedule, index, listTimeSlot, setListTimeSlot, isEdit, setIsEdit, setCurrentTimeslot}) => {
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

    useEffect(() => {
        schedule.sectionList ? setListSection(schedule.sectionList) : setListSection([])
        if(schedule.id) {
            form.setFieldsValue(schedule)
            form.setFieldValue("departureTime", dayjs(schedule.departureTime))
            setTime(schedule.departureTime)
        } else {
            form.resetFields()
        }
    }, [schedule])
    useEffect(() => {
        let lc = listCoach.map((coach) => ({
            value: coach.coachType.id,
            label: coach.coachType.name
        }))
        setOptions(lc)
        // if(schedule?.id) {
        //     handleLoadSection()
        // }

            // form.setFieldsValue({...schedule})
            // form.setFieldValue("departureTime", dayjs(schedule.departureTime))
            // form.setFieldValue("coachTypeId", schedule.coachTypeId)
            // form.setFieldValue("travelPathId", schedule.travelPathId)
        
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
        }
        const res = await apiDeleteTimeslot(id)
        if(res.data.error == 0) {
            delete listTimeSlot[index]
            setCurrentTimeslot(listTimeSlot[index-1])
            let tmp = listTimeSlot.filter(tl => tl)
            setListTimeSlot([...tmp])
        }
    }

    // async function handleLoadSection () {
    //     const res = await apiGetSection(schedule.id)
    //     setListSection([...res.data.data])
    // }
    const handleChooseTime = (e) => {
        setTime(e.valueOf())
    }

    const handleUpdateTimeslot = async () => {
        const data = {...form.getFieldsValue(), departureTime: time, sectionList: listSection}
        const res = await apiUpdateTimeslot(data)
        if(res.data.error) {
            enqueueSnackbar("Cập nhật thành công", {
                variant: "success"
            })
        }
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
                <Row className='space-x-4 grid grid-cols-12'>
                    <Form.Item name="departureTime" className='col-span-2'>
                        <TimePicker format="HH:mm" placeholder="Nhập giờ" onChange={(e) => handleChooseTime(e)} className='w-full'/>
                    </Form.Item>
                   <Form.Item name="coachTypeId" className='col-span-3'>
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
                    
                    <Form.Item name="travelPathId" className='col-span-3'>
                        <Select defaultValue="Chọn lộ trình" className='w-full' options={listTP}>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="price" className='col-span-3'>
                        <InputNumber suffix="VND" className='w-full' min={0}></InputNumber>
                    </Form.Item>
                    
                    <Button className="del-btn" onClick={() => {
                            handleDeleteTimeslot(schedule.id)
                        }} icon={<DeleteFilled />} />
                </Row>
                <Form.Item name="id" className='hidden'/>
                </Form>
                <div>
                    {
                        listSection.length ? <>{
                            listSection.map((t, sectionIndex) => <Section section={t} index={sectionIndex} listSection={listSection} setListSection={setListSection}/> )
                        }</> : null
                    }
                </div>
                {
                    <p onClick={() => {
                        setListSection([...listSection, {}])
                    }} style={{color: '#006D38'}} className='w-28'><PlusCircleOutlined />Thêm chặng</p>
                }
                <div className='flex flex-row justify-center'>
                    {
                        schedule.id && <Button onClick={() => handleUpdateTimeslot()} className='w-1/6'>Lưu</Button>
                    }
                </div>
                    <Button onClick={() => console.log(listTimeSlot)}>sss</Button>
            </Card>
        </div>
    )
}

export default TimeSlotCard