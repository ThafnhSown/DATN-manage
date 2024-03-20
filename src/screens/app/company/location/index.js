import OfficeCard from "../components/OfficeCard"
import OfficeForm from "../components/OfficeForm"
import { Card, Button, Select } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import ModalRoute from "../components/ModalRoute";
import AddPointToRoute from "../components/AddPointToRoute";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { requestLoadListRoute, setCurrentRoute } from "../../../../redux/slices/routeSlice";
import { requestLoadCoach, requestLoadOrder, requestLoadPolicy } from "../../../../redux/slices/companySlice"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../../utils/Loading";
import './style.css'

const Location = () => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const isLoading = useAppSelector((state) => state.routeState.loading)
    const currentRoute = useAppSelector((state) => state.routeState.currentRoute)
    const navigate = useNavigate()

    useEffect(() => {
        if(!listRoute.length) {
            handleLoadRoutes()
        }
        dispatch(requestLoadOrder(companyId))
        dispatch(requestLoadCoach(companyId))
        dispatch(requestLoadPolicy(companyId))
        dispatch(setCurrentRoute(null))
    }, [])

    async function handleLoadRoutes() {
        try{
            await dispatch(requestLoadListRoute(companyId))
        } catch(err) {
            console.log(err)
        }
    }
    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district}/${route?.startPoint.province} - ${route?.endPoint.district}/${route?.endPoint.province}`
    }))

    return (
        <div className="px-24 space-y-4">
           {
            isLoading ? <LoadingPage /> : <div>
                <div>
            <Card>
                <Select className="mr-4 w-1/2" defaultValue="Chọn tuyến xe" options={selectOption} onSelect={(value) => dispatch(setCurrentRoute(value))}/>
                <Button onClick={() => navigate("/van-phong")} className="w-1/8 office-btn h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-md mx-1 mt-4" icon={<PlusOutlined />}>Văn phòng</Button>
                <Button onClick={() => navigate("/lo-trinh")} className="w-1/8 route-btn h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-md mx-1 mt-4" icon={<PlusOutlined />}>Lộ trình</Button>
                <Button onClick={() => navigate("/tuyen")} className="w-1/8 h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-md mx-1 mt-4" icon={<PlusOutlined />}>Tuyến</Button>
            </Card>
        </div>
        <div>
            {currentRoute && <AddPointToRoute currentRoute={currentRoute}/>}
        </div>
        </div>
           }
        </div>
    )
}

export default Location