import OfficeCard from "../components/OfficeCard"
import OfficeForm from "../components/OfficeForm"
import { Card, Button, Select } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import ModalRoute from "../components/ModalRoute";
import AddPointToRoute from "../components/AddPointToRoute";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { requestLoadListRoute, setCurrentRoute } from "../../../../redux/slices/routeSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

const Location = () => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
    const navigate = useNavigate()

    async function handleLoadRoutes() {
        try{
            await dispatch(requestLoadListRoute(companyId))
        } catch(err) {
            console.log(err)
        }
    }
    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`
    }))

    useEffect(() => {
        handleLoadRoutes()
        dispatch(setCurrentRoute(null))
    }, [])

    return (
        <div className="px-24 space-y-4">
            <div>
                <Card>
                    <Select className="mr-4" defaultValue="Chọn tuyến xe" options={selectOption} style={{width: 550, height:50}} onSelect={(value) => dispatch(setCurrentRoute(value))}/>
                    <Button onClick={() => navigate("/van-phong")} className="office-btn h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-md mx-1 mt-4" icon={<PlusOutlined />}>Văn phòng</Button>
                    <Button onClick={() => navigate("/lo-trinh")} className="route-btn h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-md mx-1 mt-4" icon={<PlusOutlined />}>Lộ trình</Button>
                    <Button onClick={() => navigate("/tuyen")} className="h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-md mx-1 mt-4" icon={<PlusOutlined />}>Tuyến</Button>
                </Card>
            </div>
            <div>
                {currentRoute && <AddPointToRoute currentRoute={currentRoute}/>}
            </div>
        </div>
    )
}

export default Location