 import TimeSlotCard from "../components/TimeSlotCard"
 import { Card, Button, Select, Divider, Typography, Row, List } from 'antd'
 import InfiniteScroll from 'react-infinite-scroll-component';
 import { PlusCircleOutlined, EditFilled, ClockCircleFilled } from '@ant-design/icons'
 import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
 import { requestLoadListRoute, requestLoadPoint, requestLoadTravelPath, setCurrentRoute } from "../../../../redux/slices/routeSlice";
 import { useEffect, useState } from "react";
import SubSchedule from "../components/SubSchedule";
import { apiCreateSchedule, apiGetSection, apiGetTimeSlot, apiListSchedule } from "../../../../api/services";
import moment from 'moment'
const { Title } = Typography
import { convertDate } from "../../../../utils/convertTime";
import './style.css'
import dayjs from 'dayjs'

const Schedule = () => {
    const dispatch = useAppDispatch()
    const [isCreate, setIsCreate] = useState(false)
    const [listSchedule, setListSchedule] = useState([])
    const [subSchedule, setSubSchedule] = useState([])
    // const listSchedule = useAppSelector(state => state.scheduleState.listSchedule)
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
    const [listTimeSlot, setListTimeSlot] = useState([])
    const [mapTS, setMapTS] = useState({})
    const [mapEdit, setMapEdit] = useState()
    const [isEdit, setIsEdit] = useState(false)
    useEffect(() => {
        handleLoadRoutes()
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
    const handleCreateMainSchedule = async (e) => {
        e.preventDefault()
        const time = moment().startOf('day').valueOf()
        const data = {
            coachRouteId: currentRoute,
            createTimeslotRequestList: listTimeSlot,
            date: time,
            name: "Lịch chính",
            startTime: 0,
            endTime: 0,
            type: 1
        }
        const res = await apiCreateSchedule(data)
        if(res.data.error == 0) {
            setListTimeSlot([])
            handleChooseRoute(currentRoute)
        }
    }

    const handleChooseRoute = async (value) => {
        await dispatch(setCurrentRoute(value))
        await dispatch(requestLoadTravelPath(companyId))
        await dispatch(requestLoadPoint(value))
        handleLoadSchedule(value)
        setIsCreate(false)
        setListTimeSlot([])
    }

    const handleLoadTimeSlot = async (scheduleId) => {
        let ts = {}
        let ed = {}
        const res = await apiGetTimeSlot(scheduleId)
        if(res.data.error == 0) {
            setMapEdit(scheduleId)
            ts[scheduleId] = res.data.data
            setMapTS({...mapTS , ...ts})
        }
    }

    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`
    }))
    return (
        <div className="mx-16 space-y-4">
            <Card>
            <Row>
                <Title level={3}>Lịch cố định</Title>
            </Row>
            <Row className="items-center space-x-6">
                <Title level={5}>Tuyến xe</Title>
                <Select defaultValue="Chọn tuyến xe" options={selectOption} style={{width: 800, height:40}} onSelect={(value) => handleChooseRoute(value)}>

                </Select>
            </Row>
                {
                    listSchedule && listSchedule.length > 0 ? <div className="h-80 overflow-auto mt-6">
                    <InfiniteScroll
                        dataLength={1}
                    >
                        <List
                            dataSource={listSchedule}
                            renderItem={(item) => (
                                <div>
                                <List.Item className="li-schedule">
                                    <div className="w-full">
                                    <div className="font-extrabold text-md grid grid-cols-12 w-full">
                                        <p className="ml-4 col-span-4">
                                        {`${convertDate(item.date)} | ${item.totalSlot} nốt`}
                                        </p>
                                        <p className="col-span-6"/>
                                        <a className="col-span-1 text-green-700"
                                            onClick={() => {
                                                setIsEdit(!isEdit)
                                                handleLoadTimeSlot(item.id)
                                            }}
                                        ><EditFilled /> Sửa</a>
                                        <a className="col-span-1 text-red-700"><ClockCircleFilled /> Dừng</a>
                                        
                                    </div>

                                    </div>
                                </List.Item>
                                    {
                                        mapEdit == item.id & isEdit ? mapTS[item.id]?.map((ts, index) => <TimeSlotCard schedule={ts} index={index} isEdit={isEdit} setIsEdit={setIsEdit}/> ) : null
                                    }
                                </div>
                             
                            )}
                        >
                        </List>
                   
                </InfiniteScroll>
                    </div> : null
                }

                {
                    listTimeSlot?.map((sh, index) => <TimeSlotCard schedule={sh} index={index} listTimeSlot={listTimeSlot} setListTimeSlot={setListTimeSlot}/>)
                }
           
               
            <Button 
            style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} 
            icon={<PlusCircleOutlined />}
            onClick={() => {
                setIsCreate(true)
                setListTimeSlot([...listTimeSlot, {}])
            }}>
                    Thêm giờ xuất bến
            </Button>
            
            <Divider />
            <Row className="justify-center">
            {
                isCreate && <Button onClick={e => handleCreateMainSchedule(e)}>Hoàn thành</Button>
            }
            </Row>
        </Card>

        <Card className="space-y-4">
            {
                subSchedule?.map(sc => <SubSchedule schedule={sc} setListSchedule={setListSchedule} setSubSchedule={setSubSchedule}/>)
            }
            <Row className="justify-center">
                <Button 
                    onClick={() => setSubSchedule([...subSchedule, {}])}
                    style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} icon={<PlusCircleOutlined />}>Thêm lịch phụ</Button>
            </Row>
        </Card>
        

        </div>
    )
}

export default Schedule