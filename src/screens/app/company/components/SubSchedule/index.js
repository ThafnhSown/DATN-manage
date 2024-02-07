import ScheduleCard from "../TimeSlotCard"
import { Card, Button, Typography, Row, DatePicker, Divider, Input, List } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined, EditFilled, ClockCircleFilled } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { requestLoadListRoute, setCurrentRoute } from "../../../../../redux/slices/routeSlice";
import { useEffect, useState } from "react";
import { requestLoadSchedule } from "../../../../../redux/slices/scheduleSlice";
const { Title } = Typography
import TimeSlotCard from "../TimeSlotCard";
import { apiCreateSchedule } from "../../../../../api/services";
import InfiniteScroll from "react-infinite-scroll-component";
import { listDaysInBetween } from "../../../../../utils/convertTime";
import dayjs from 'dayjs';

const SubSchedule = ({schedule, setListSchedule, setSubSchedule}) => {
   const dispatch = useAppDispatch()
   const [isCreate, setIsCreate] = useState(false)
   const [firstDate, setFirstDate] = useState()
   const [secondDate, setSecondDate] = useState()
   const [listTimeSlot, setListTimeSlot] = useState([])
   const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
   const [changeName, setChangeName] = useState(false) 
   const [scheduleName, setScheduleName] = useState('Lịch phụ')
   const [listDay, setListDay] = useState([]) 

    useEffect(() => {
        const daylist = listDaysInBetween(schedule?.startTime, schedule?.endTime)
        setListDay(daylist)
    }, [])

   const handleCreateSubSchedule = async () => {
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
    if(res.data.error == 0) {
        handleLoadSchedule(currentRoute)
    }
   }
   async function handleLoadSchedule(id) {
    let res= {}
    try {
        await Promise.all([
            res = await apiListSchedule(id),
            setListSchedule(res.data.data.filter(item => item.type == 1)),
            setSubSchedule(res.data.data.filter(item => item.type == 2))
        ])
    } catch(err) {
        console.log(err)
    }
}
   return (
    <div>
        <div>
            {
                listDay && listDay.length > 0 && <div>
                    <Title level={3}>{schedule.name}</Title>
            <Row className="items-center space-x-6 mb-2">
           <Title level={5}>Thời gian</Title>
           <DatePicker defaultValue={dayjs(schedule.startTime)} style={{width: 300}}/>
           <ArrowRightOutlined />
           <DatePicker defaultValue={dayjs(schedule.endTime)} style={{width: 300}}/>
           </Row>
                </div>
            }
        {
            listDay && listDay.length > 0 ? <div className="h-48 overflow-auto mt-6">
            
            <InfiniteScroll
                dataLength={1}
            >
                <List
                    dataSource={listDay}
                    renderItem={(item) => (
                        <List.Item className="li-schedule">
                            <div className="font-extrabold text-md grid grid-cols-12 w-full">
                                <p className="ml-4 col-span-4">
                                    {
                                       `${ item } | ${schedule.totalSlot} nốt`
                                    }
                                </p>
                                <p className="col-span-6"/>
                                <p className="col-span-1 text-green-700"><EditFilled /> Sửa</p>
                                <p className="col-span-1 text-red-700"><ClockCircleFilled /> Dừng</p>
                            </div>
                        </List.Item>
                    )}
                >
                </List>
           
        </InfiniteScroll>
        <Divider />
            </div> : null
        }
        </div>
        {
        !schedule.id && <div className="mt-4 space-y-4">
           <Row>
               {
                    changeName ? <Input onChange={(e) =>setScheduleName(e.target.value)} className="w-48" placeholder="Tên lịch phụ"/> : <Title level={3}>Lịch phụ</Title>
               }
                <div onClick={() => setChangeName(!changeName)} className="mt-2 text-green-900">
                    <EditFilled/> Sửa tên lịch phụ
                </div>
           </Row>
           <Row className="items-center space-x-6">
           <Title level={5}>Thời gian</Title>
           <DatePicker onChange={(date) => setFirstDate(date.valueOf())} style={{width: 300}}/>
           <ArrowRightOutlined />
           <DatePicker onChange={(date) => setSecondDate(date.valueOf())} style={{width: 300}}/>
           </Row>
           {
                listTimeSlot?.map((sh, index) => <TimeSlotCard schedule={sh} index={index} listTimeSlot={listTimeSlot} setListTimeSlot={setListTimeSlot}/>)
            }
            <Button 
            style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} 
            icon={<PlusCircleOutlined />}
            onClick={() => {
                setListTimeSlot([...listTimeSlot, {}])
            }}>
                    Thêm giờ xuất bến
            </Button>
            <Row className="justify-center">  
                <Button onClick={() => handleCreateSubSchedule()}>Hoàn thành</Button>
            </Row>
            <Divider />
        </div>
        }
    </div>
    
   )
}

export default SubSchedule