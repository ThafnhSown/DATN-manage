 import TimeSlotCard from "../components/TimeSlotCard"
 import { Card, Button, Select, Divider, Typography, Row } from 'antd'
 import { PlusCircleOutlined } from '@ant-design/icons'
 import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
 import { requestLoadListRoute, requestLoadPoint, setCurrentRoute } from "../../../../redux/slices/routeSlice";
 import { useEffect, useState } from "react";
import { requestLoadSchedule, addSchedule } from "../../../../redux/slices/scheduleSlice";
import SubSchedule from "../components/SubSchedule";
 const { Title } = Typography

const Schedule = () => {
    const dispatch = useAppDispatch()
    const [isCreate, setIsCreate] = useState(false)
    const [schedule, setSchedule] = useState({})
    const listSchedule = useAppSelector(state => state.scheduleState.listSchedule)
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
    const [listTimeSlot, setListTimeSlot] = useState([])

    useEffect(() => {
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
        let tmp = []
        try {
            await Promise.all([
                dispatch(requestLoadSchedule(id)),
                dispatch(requestLoadPoint(id)),
                tmp = listSchedule?.filter(item => item.type == 0),
                setListTimeSlot(tmp?.createTimeslotRequestList ?? []),
            ])
            
        } catch(err) {
            console.log(err)
        }
    }

    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`
    }))
    return (
        <div className="mx-16 space-y-4">
            <Card>
                {/* <Button onClick={() => console.log("s", schedule)}>ly</Button> */}
            <Row>
                <Title level={3}>Lịch cố định</Title>
            </Row>
            <Row className="items-center space-x-6">
                <Title level={5}>Tuyến xe</Title>
                <Select defaultValue="Chọn tuyến xe" options={selectOption} style={{width: 800, height:40}} onSelect={(value) => {
                    dispatch(setCurrentRoute(value))
                    handleLoadSchedule(value)
                    setIsCreate(false)
                    }}>

                </Select>
            </Row>
                {
                    listTimeSlot?.map((sh, index) => <TimeSlotCard schedule={sh} index={index} listTimeSlot={listTimeSlot} scheduleData={schedule} setScheduleData={setSchedule}/>)
                }
            <Button style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} icon={<PlusCircleOutlined />} onClick={() => setListTimeSlot([...listTimeSlot, {}])}>Thêm giờ xuất bến</Button>
            <Row className="justify-center">
                {
                    isCreate &&  <Button onClick={() => setIsCreate(false)}>Hoàn thành</Button>
                }
            </Row>
            <Divider />
            {/* {subSchedule && <SubSchedule />}
            <Row className="justify-center">
                {
                    isCreate && <Button style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} icon={<PlusCircleOutlined />} onClick={() => setSubSchedule(true)}>Thêm lịch phụ</Button>
                }
                
            </Row> */}
        </Card>
        

        </div>
    )
}

export default Schedule