import { Card, Button, Typography, Row, DatePicker, Divider, Input, List } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined, EditFilled, DeleteFilled } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { requestLoadListRoute, setCurrentRoute, requestLoadTravelPath, requestLoadPoint } from "../../../../../redux/slices/routeSlice";
import { useEffect, useState } from "react";
const { Title } = Typography
import TimeSlotCard from "../TimeSlotCard";
import { apiCreateSchedule, apiCreateTimeslot, apiDeleteSubSchedule, apiGetListTimeslotByDate } from "../../../../../api/services";
import dayjs from 'dayjs';

const SubSchedule = ({listSubTimeslot, schedule, setSubSchedule}) => {
   const dispatch = useAppDispatch()
   const [isCreate, setIsCreate] = useState(false)
   const [firstDate, setFirstDate] = useState()
   const [secondDate, setSecondDate] = useState()
   const [listTimeSlot, setListTimeSlot] = useState([])
   const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
   const companyId = useAppSelector(state => state.authState.userInfo.id)
   const [currentDate, setCurrentDate] = useState(dayjs(new Date()).startOf('day').valueOf())
   const [changeName, setChangeName] = useState(false) 
   const [scheduleName, setScheduleName] = useState('Lịch phụ')
   const [currentTimeslot, setCurrentTimeslot] = useState()
   const [currentIndex, setCurrentIndex] = useState(-1)

    useEffect(() => {
        setListTimeSlot(listSubTimeslot)
        setScheduleName(schedule.name)
    }, [])

   const handleCreateSubSchedule = async (e) => {
    e.preventDefault()
    const data = {
        coachRouteId: currentRoute,
        startTime: firstDate,
        endTime: secondDate, 
        date: 0,
        type: 2,
        createTimeslotRequestList: listTimeSlot,
        name: scheduleName
    }
    const res = await apiCreateSchedule(data)
    if(!res.data.error) {
        setListTimeSlot([])
    }
   }

   const handleCreateTimeslot = async () => {
    let tmp = listTimeSlot.length - 1
    const data = {...listTimeSlot[tmp], coachScheduleId: listTimeSlot[0].coachSchedule.id}
    const res = await apiCreateTimeslot(data)
    if(!res.data.error) {
        setListTimeSlot(listTimeSlot)
        // handleChooseRoute(currentRoute)
    }
    }   

    const handleDelSchedule = async () => {
        const res = await apiDeleteSubSchedule({
            coachRouteId: currentRoute,
            startTime: schedule.startTime,
            endTime: schedule.endTime
        })
        if(!res.data.error) {
            setSubSchedule([])
        }
    }

   return (
    <div>
      <div className="mt-4 space-y-4">
        {
            schedule.id ? <div>
                 <Row className='space-x-3'>
                    <Title level={3}>{schedule.name ?? "Lịch phụ"}</Title>
                    <Button className="del-btn" onClick={() => {
                            handleDelSchedule()
                        }} icon={<DeleteFilled />} />
                </Row>
                <Row className="items-center space-x-6">
                <Title level={5}>Thời gian</Title>
                <DatePicker value={dayjs(schedule.startTime)} style={{width: 300}}/>
                <ArrowRightOutlined />
                <DatePicker value={dayjs(schedule.endTime)} style={{width: 300}}/>
                </Row>

            </div> : <div className='space-y-4'>
            <Row className='space-x-2'>
               {
                    changeName ? <Input onChange={(e) =>setScheduleName(e.target.value)} className="w-48" placeholder="Tên lịch phụ"/> : <Title level={3}>Lịch phụ</Title>
               }
                <div onClick={() => setChangeName(!changeName)} className="mt-2 text-green-900">
                    <EditFilled/> Sửa tên lịch phụ
                </div>
                <Button className="del-btn" onClick={() => {
                    handleDelSchedule()
                }} icon={<DeleteFilled />} />
           </Row>
           <Row className="items-center space-x-6">
           <Title level={5}>Thời gian</Title>
           <DatePicker onChange={(date) => setFirstDate(date.startOf('day').valueOf())}/>
           <ArrowRightOutlined />
           <DatePicker onChange={(date) => setSecondDate(date.startOf('day').valueOf())}/>
           </Row>
            </div>
        }
          
           {
                    listTimeSlot?.map((sh, index) => <Button onClick={() => {
                        setCurrentTimeslot(sh)
                        setCurrentIndex(index)
                    }}
                    className={index != currentIndex ? 'un-choose-btn' : ''}
                    >{sh.departureTime ? dayjs(sh.departureTime).format("HH:mm") : '--:--'}</Button>)
                }
                {
                    (isCreate || currentTimeslot) && <TimeSlotCard schedule={currentTimeslot} setCurrentTimeslot={setCurrentTimeslot} index={currentIndex} listTimeSlot={listTimeSlot} setListTimeSlot={setListTimeSlot} isEdit={false}/>
                }
            <Button 
            style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} 
            icon={<PlusCircleOutlined />}
            onClick={() => {
                setCurrentIndex(currentIndex+1)
                setCurrentTimeslot({})
                setListTimeSlot([...listTimeSlot, {}])
                setIsCreate(true)
            }}>
                    Thêm giờ xuất bến
            </Button>
            <Row className="justify-center">  
                {/* {   
                    isCreate && <Button onClick={() => handleCreateSubSchedule()}>Hoàn thành</Button>
                } */}
                {
                    isCreate && !currentTimeslot?.id && <Button onClick={(e) => listTimeSlot[0]?.id ? handleCreateTimeslot() : handleCreateSubSchedule(e)}>Hoàn thành</Button>
                }
            </Row>
            <Divider />
        </div>
    </div>
    
   )
}

export default SubSchedule