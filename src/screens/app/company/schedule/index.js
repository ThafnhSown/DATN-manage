 import TimeSlotCard from "../components/TimeSlotCard"
 import { Card, Button, Select, Divider, Typography, Row, List, DatePicker } from 'antd'
 import InfiniteScroll from 'react-infinite-scroll-component';
 import { PlusCircleOutlined, EditFilled, ClockCircleFilled } from '@ant-design/icons'
 import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
 import { requestLoadListRoute, requestLoadPoint, requestLoadTravelPath, setCurrentRoute } from "../../../../redux/slices/routeSlice";
 import { useEffect, useState } from "react";
import SubSchedule from "../components/SubSchedule";
import { apiCreateSchedule, apiCreateTimeslot, apiGetListTimeslotByDate, apiGetSection, apiGetTimeSlot, apiListSchedule } from "../../../../api/services";
import moment from 'moment'
const { Title } = Typography
import { convertDate, convertSecondsToDayjs } from "../../../../utils/convertTime";
import './style.css'
import dayjs from 'dayjs'
import { ModalTimeslot } from "../components/ModalTimeslot";

const Schedule = () => {
    const dispatch = useAppDispatch()
    const [isCreate, setIsCreate] = useState(false)
    const [listSchedule, setListSchedule] = useState([])
    const [subSchedule, setSubSchedule] = useState([])
    // const listSchedule = useAppSelector(state => state.scheduleState.listSchedule)
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
    const [currentDate, setCurrentDate] = useState(dayjs(new Date()).startOf('day').valueOf())
    const [currentTimeslot, setCurrentTimeslot] = useState()
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [listTimeSlot, setListTimeSlot] = useState([])
    const [listSubTimeslot, setListSubTimeslot] = useState([])
    const [extraTimeslot, setExtraTimeslot] = useState(false)
    const [scheduleId, setScheduleId] = useState()
    useEffect(() => {
        handleLoadRoutes()
    }, [])
    // useEffect(() => {
    //     handleLoadSchedule(currentRoute)
    // }, [currentRoute])
    async function handleLoadRoutes() {
        try{
            await dispatch(requestLoadListRoute(companyId))
        } catch(err) {
            console.log(err)
        }
    }
    async function handleLoadTimeslot(props) {
        const res = await apiGetListTimeslotByDate(props)
        if(res.data.error == 0 && res.data.data.length != 0) {
            const tmp = res.data.data.filter(tl => tl.coachSchedule.type == 1)
            const subTmp = res.data.data.filter(tl => tl.coachSchedule.type == 2)
            setCurrentTimeslot(tmp[0])
            setCurrentIndex(0)
            setListTimeSlot(tmp)
            setListSubTimeslot(subTmp)
            setScheduleId(tmp[0].coachSchedule.id)
        } else {
            setCurrentTimeslot()
            setCurrentIndex(-1)
            setListTimeSlot([])
            setListSubTimeslot([])
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

    const handleCreateTimeslot = async () => {
        let tmp = listTimeSlot.length - 1
        const data = {...listTimeSlot[tmp], coachScheduleId: listTimeSlot[0].coachSchedule.id, coachRouteId: currentRoute, type: 1}
        const res = await apiCreateTimeslot(data)
        if(!res.data.error) {
            setListTimeSlot([])
            handleChooseRoute(currentRoute)
        }
    }

    const handleChooseRoute = async (value) => {
        await dispatch(setCurrentRoute(value))
        await dispatch(requestLoadTravelPath(companyId))
        await dispatch(requestLoadPoint(value))
        handleLoadTimeslot({date: currentDate, coachRouteId: value})
        setIsCreate(false)
    }

    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`
    }))
    return (
        <div className="mx-16 space-y-4">
            <Card
                extra={<DatePicker format='DD/ MM/ YY' defaultValue={dayjs(new Date())} onChange={(e) => {
                    setCurrentDate(e.startOf('day').valueOf())
                    handleLoadTimeslot({
                        date: e.startOf('day').valueOf(), 
                        coachRouteId: currentRoute
                    })
                }}/>}
            >
            <Row>
                <Title level={3}>Lịch cố định</Title>
            </Row>
            <Row className="items-center space-x-6 mb-4">
                <Title level={5}>Tuyến xe</Title>
                <Select defaultValue="Chọn tuyến xe" options={selectOption} style={{width: 500, height:40}} onSelect={(value) => handleChooseRoute(value)}>
                </Select>
                
                <div className="flex justify-end space-x-4">
                    <Button
                        style={{backgroundColor:"white", color: "#006D38", borderRadius: 4}} 
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                            setIsCreate(true)
                            setCurrentIndex(listTimeSlot.length)
                            setCurrentTimeslot({})
                            setListTimeSlot([...listTimeSlot, {}])
                    }}
                    >
                        Thêm giờ xuất bến
                    </Button>
                    <Button 
                    onClick={() => setExtraTimeslot(true)}
                    style={{backgroundColor:"white", color: "#006D38", borderRadius: 4}} >
                        Tạo chuyến tăng cường
                    </Button>
                </div>
                <p className="text-lg">{listTimeSlot.length} chuyến</p>
            </Row>
                {
                    listTimeSlot?.map((sh, index) => <Button onClick={() => {
                        setCurrentTimeslot(sh)
                        setCurrentIndex(index)
                    }}
                    className={index != currentIndex ? 'un-choose-btn' : ''}
                    >{sh.departureTime ? dayjs(convertSecondsToDayjs(sh.departureTime)).format("HH:mm") : '--:--'}</Button>)
                }
                {
                   currentTimeslot && <TimeSlotCard schedule={currentTimeslot} index={currentIndex} listTimeSlot={listTimeSlot} setListTimeSlot={setListTimeSlot} isEdit={false} setCurrentTimeslot={setCurrentTimeslot} scheduleId={scheduleId} limit={{from: currentDate, to: 0}}/>
                }
       
            <Divider />
            <Row className="justify-center">
            {
                isCreate && !currentTimeslot?.id && <Button onClick={(e) => listTimeSlot[0]?.coachSchedule ? handleCreateTimeslot() : handleCreateMainSchedule(e)}>Hoàn thành</Button>
            }
            </Row>
        </Card>

        {
            listSubTimeslot.length ? <Card className="space-y-4">
                <SubSchedule listSubTimeslot={listSubTimeslot} schedule={listSubTimeslot[0].coachSchedule} setSubSchedule={setListSubTimeslot}/>
            </Card> : null
        }

        <Card className="space-y-4">
            {
                subSchedule.map(sc => <SubSchedule listSubTimeslot={[]} schedule={{}}/>)
               
            }
             <Row className="justify-center">
                <Button 
                    onClick={() => setSubSchedule([...subSchedule, {}])}
                    style={{backgroundColor:"white", color: "#006D38", borderRadius: 4, marginTop:10}} icon={<PlusCircleOutlined />}>Thêm lịch phụ</Button>
            </Row>
        </Card>
        
            {
                extraTimeslot && <ModalTimeslot modalShow={extraTimeslot} setModalShow={setExtraTimeslot} /> 
            }
        </div>
    )
}

export default Schedule