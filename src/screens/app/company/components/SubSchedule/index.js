import { Card, Button, Typography, Row, DatePicker, Divider, Input, List } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined, EditFilled, ClockCircleFilled } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { requestLoadListRoute, setCurrentRoute } from "../../../../../redux/slices/routeSlice";
import { useEffect, useState } from "react";
const { Title } = Typography
import TimeSlotCard from "../TimeSlotCard";
import { apiCreateSchedule } from "../../../../../api/services";
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
   const [currentTimeslot, setCurrentTimeslot] = useState()
   const [currentIndex, setCurrentIndex] = useState(-1)

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
    console.log(data)
    // const res = await apiCreateSchedule(data)
    // if(res.data.error == 0) {
    //     // handleLoadSchedule(currentRoute)
    // }
   }
   return (
    <div>
      <div className="mt-4 space-y-4">
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
                    listTimeSlot?.map((sh, index) => <Button onClick={() => {
                        setCurrentTimeslot(sh)
                        setCurrentIndex(index)
                    }}
                    className={index != currentIndex ? 'un-choose-btn' : ''}
                    >{sh.departureTime ? dayjs(sh.departureTime).format("HH:mm") : '--:--'}</Button>)
                }
                {
                    (isCreate || currentTimeslot) && <TimeSlotCard schedule={currentTimeslot} index={currentIndex} listTimeSlot={listTimeSlot} setListTimeSlot={setListTimeSlot} isEdit={false}/>
                }
            <Button 
            style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} 
            icon={<PlusCircleOutlined />}
            onClick={() => {
                setCurrentIndex(currentIndex+1)
                setCurrentTimeslot({})
                setListTimeSlot([...listTimeSlot, {}])
            }}>
                    Thêm giờ xuất bến
            </Button>
            <Row className="justify-center">  
                <Button onClick={() => handleCreateSubSchedule()}>Hoàn thành</Button>
            </Row>
            <Divider />
        </div>
    </div>
    
   )
}

export default SubSchedule