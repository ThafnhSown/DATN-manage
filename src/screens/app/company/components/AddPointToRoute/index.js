import { useEffect, useState } from 'react' 
import { Select, Card, Button, Input, Modal, Menu, Row, Form } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestCreateRoute, requestLoadListRoute, requestDeleteRoute } from "../../../../../redux/slices/routeSlice"
import { apiAddPointToRoute, apiGetListDistrict, apiGetListProvince, apiGetLocation, apiGetRouteDetail } from "../../../../../api/services"
import { requestLoadListOffice } from '../../../../../redux/slices/officeSlice'

const AddPointToRoute = () => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const listOffice = useAppSelector((state) => state.officeState.listOffice)
    const [currentRoute, setCurrentRoute] = useState()
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listPoint, setListPoint] = useState([])
    const [listDataPoint, setListDataPoint] = useState([])
    const selectOption = listRoute.map(route => ({
        value: route.id,
        label: `${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`
    }))
    useEffect(() => {
        handleLoadPoint(31)
        loadProvince()
        handleLoadRoutes()
    }, [])
    const son = listOffice.map(e => ({
        value: e.id,
        label: e.address
    }))
    async function loadProvince() {
        const res = await apiGetListProvince()
        const listP = res.data.data.map((p) => ({
            value: p.id,
            label: p.province
        }))
        setListProvince(listP)
    }

    async function loadDistrict(value) {
        if(value) {
            const res = await apiGetListDistrict(value)
            const listD = res.data.data.map(d => ({
                value: d.id,
                label: d.district
            }))
            setListDistrict(listD)
        }  
    }

    async function handleChooseDistrict(value) {
        const res = await apiGetLocation(value)
        const tmp = {
            address: `${res.data.data.district} - ${res.data.data.province}`,
            locationId: value,
        }
     
        setListPoint([...listPoint, tmp])
    }
    async function handleLoadRoutes() {
        try{
            await dispatch(requestLoadListRoute(companyId))
            await dispatch(requestLoadListOffice(companyId))
        } catch(err) {
            console.log(err)
        }
    }

    async function handleLoadPoint(id) {
        const res = await apiGetRouteDetail(id)
        console.log(res)
    }

    async function handleAddPoint(listPoint) {
        const res = await apiAddPointToRoute({
            coachRouteId: currentRoute,
            pointList: listPoint
        })
        console.log(res)
    }

    return (
        <>
            <div>
                <div>
                <Select defaultValue="Chọn tuyến xe" options={selectOption} style={{width: 500, height:50}} onChange={(value) => setCurrentRoute(value)}/>
                    <div className="flex flex-row mt-6 space-x-4">
                        <div className="w-1/4">
                            <Card>
                                <div className='flex flex-col space-y-2'>
                                <span>Chọn tỉnh, thành phố:</span>
                                <Select
                                 options={listProvince}
                                 defaultValue='Chọn tỉnh, thành phố'
                                 onChange={(value) => {
                                    loadDistrict(value)
                                 }}
                                />
                                <span>Chọn quận, huyện:</span>
                                <Select options={listDistrict} defaultValue='Chọn quận, huyện' onChange={(value) => handleChooseDistrict(value)}/>  
                                </div>
                            </Card>
                            
                            
                        </div>
                        <div className="w-3/4">
                            <Card>
                            {
                                listPoint.length ? <div className='space-y-3'>
                                    {
                                        listPoint.map((point, index) => {
                                            let abc={"description": null, "officeId": null}
                                            return (
                                            <>
                                            <div className='flex-row space-x-4 grid grid-cols-12'>
                                               <b className='col-span-4'>{point.address}</b>
                                               <div className='col-span-5 flex flex-row space-x-2'>
                                                <Input onChange={(e) => abc.description=e.target.value} style={{width: 200}}/>
                                                <p>hoặc</p>
                                                <Select options={son} defaultValue="Văn phòng" onChange={(value) => abc.officeId = value} />
                                                </div>
                                                <div className='col-span-2 space-x-1'>
                                                <Button onClick={() => {
                                                    let isOffice
                                                    if(!son.officeId) isOffice = false;
                                                    const vn = {...point, ...abc, sequence: index+1, isOffice: isOffice}
                                                    setListDataPoint([...listDataPoint, vn])
                                                }}
                                                className='bg-green-700 text-white hover:bg-white'
                                                >Lưu</Button>
                                                <Button onClick={() => {
                                                    listPoint.splice(index, 1)
                                                    setListPoint([...listPoint])
                                                    console.log(listPoint)
                                                }}
                                                className='bg-red-600 text-white hover:bg-white hover:text-red-600'
                                                >Xóa</Button>
                                                </div>                                       
                                            </div>
                                               
                                            </>
                                        )})
                                        
                                    }
                                </div> : null
                            }
                            <Button onClick={() => handleAddPoint(listDataPoint)} className='mt-10'>Tạo lộ trình</Button>
                            </Card>   
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPointToRoute