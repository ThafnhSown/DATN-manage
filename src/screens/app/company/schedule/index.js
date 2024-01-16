 import ScheduleCard from "../components/ScheduleCard"
 import { Card, Button, Select, Divider, Typography, Row } from 'antd'
 import { PlusCircleOutlined } from '@ant-design/icons'
 import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
 import { requestLoadListRoute, setCurrentRoute } from "../../../../redux/slices/routeSlice";
 import { useEffect, useState } from "react";
import { requestLoadSchedule } from "../../../../redux/slices/scheduleSlice";
 const { Title } = Typography

const Schedule = () => {
    const dispatch = useAppDispatch()
    const [isCreate, setIsCreate] = useState(false)
    const listSchedule = useAppSelector(state => state.scheduleState.listSchedule)
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
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

    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`
    }))
    return (
        <Card>
            <Row>
                <Title level={3}>Lịch chính</Title>
            </Row>
            <Row className="items-center space-x-6">
                <Title level={5}>Tuyến xe</Title>
                <Select defaultValue="Chọn tuyến xe" options={selectOption} style={{width: 800, height:40}} onSelect={(value) => {
                    dispatch(setCurrentRoute(value))
                    setIsCreate(false)
                    }}>

                </Select>
            </Row>
            {   
                isCreate && <ScheduleCard schedule={null}/>
            }
            {
               listSchedule ? <div>
                {
                    listSchedule.map((sh, index) => <ScheduleCard schedule={sh} index={index}/>)
                }
               </div> : null
            }
            <Button style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} icon={<PlusCircleOutlined />} onClick={() => setIsCreate(true)}>Thêm giờ xuất bến</Button>
        </Card>
    )
}

export default Schedule