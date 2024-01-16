import ScheduleCard from "../../components/ScheduleCard"
import { Card, Button, Typography, Row, DatePicker } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook";
import { requestLoadListRoute, setCurrentRoute } from "../../../../../redux/slices/routeSlice";
import { useEffect, useState } from "react";
import { requestLoadSchedule } from "../../../../../redux/slices/scheduleSlice";
const { Title } = Typography

const SubSchedule = () => {
   const dispatch = useAppDispatch()
   const [isCreate, setIsCreate] = useState(false)
   const [firstDate, setFirstDate] = useState()
   const [secondDate, setSecondDate] = useState()
   const listSchedule = useAppSelector(state => state.scheduleState.listSchedule)
   const companyId = useAppSelector(state => state.authState.userInfo.id)
   const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
   useEffect(() => {
       dispatch(requestLoadSchedule(null))
       handleLoadRoutes()
       dispatch(setCurrentRoute(null))
   }, [])
   useEffect(() => {
       handleLoadSchedule(currentRoute)
   }, [currentRoute])
   async function handleLoadRoutes() {
       try{
           await dispatch(requestLoadListRoute(companyId))
       } catch(err) {
           console.log(err)
       }
   }
   async function handleLoadSchedule(id) {
       try {
           await dispatch(requestLoadSchedule(id))
       } catch(err) {
           console.log(err)
       }
   }

   return (
       <Card>
           <Row>
               <Title level={3}>Lịch phụ</Title>
           </Row>
           <Row className="items-center space-x-6">
           <Title level={5}>Thời gian</Title>
           <DatePicker onChange={(date) => setFirstDate(date.valueOf())} style={{width: 300}}/>
           <ArrowRightOutlined />
           <DatePicker onChange={(date) => setSecondDate(date.valueOf())} style={{width: 300}}/>
           </Row>
           {   
               isCreate && <ScheduleCard schedule={null} isSub={true} firstDate={firstDate} secondDate={secondDate}/>
           }
           {
              listSchedule ? <div>
               {
                   listSchedule.filter(item => item.type == 1).map((sh, index) => <ScheduleCard schedule={sh} index={index} firstDate={firstDate} secondDate={secondDate} isSub={true}/>)
               }
              </div> : null
           }
           <Button style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} icon={<PlusCircleOutlined />} onClick={() => setIsCreate(true)}>Thêm giờ xuất bến</Button>
       </Card>
   )
}

export default SubSchedule