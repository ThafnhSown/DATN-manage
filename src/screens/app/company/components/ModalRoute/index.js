import { apiCreateCoachRoute, apiDeleteRoute, apiGetListDistrict, apiGetListProvince } from "../../../../../api/services"
import { useEffect, useState, useMemo } from 'react' 
import { Select, Card, Button, Input, Modal } from 'antd'
import { SwapOutlined, EditFilled, DeleteFilled } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestLoadListRoute } from "../../../../../redux/slices/routeSlice"
import './style.css'

const ModalRoute = () => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector(state => state.routeState.listRoute)
    const [listProvince, setListProvince] = useState([])
    const [listSecondDistrict, setListSecondDistrict] = useState([])
    const [listFirstDistrict, setListFirstDistrict] = useState([])
    const [firstDistrict, setFirstDistrict] = useState()
    const [secondDistrict, setSecondDistrict] = useState()

    async function loadProvince() {
        const res = await apiGetListProvince()
        const listP = res.data.data.map((p) => ({
            value: p.id,
            label: p.province
        }))
        setListProvince(listP)
    }
    async function loadFirstDistrict(value) {
        if(value) {
            const res = await apiGetListDistrict(value)
            const listD = res.data.data.map(d => ({
                value: d.id,
                label: d.district
            }))
            setListFirstDistrict(listD)
        }  
    }

    async function loadSecondDistrict(value) {
        if(value) {
            const res = await apiGetListDistrict(value)
            const listD = res.data.data.map(d => ({
                value: d.id,
                label: d.district
            }))
            setListSecondDistrict(listD)
        }  
    }
    async function handleLoadRoutes(companyId) {
        try{
            await dispatch(requestLoadListRoute(companyId))
        } catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        handleLoadRoutes(companyId)
    }, [])

    useEffect(() => {
        loadProvince()
    }, [])

    const handleCreateRoute = async () => {
        const data ={
            coachCompanyId: companyId,
            endPointId: secondDistrict,
            startPointId: firstDistrict
        }
        const res = await apiCreateCoachRoute(data)
        if(res.data.error == 0) {
            handleLoadRoutes(companyId)
        }
    }

    const handleDeleteRoute = async (id) => {
        const res = await apiDeleteRoute({id:id})
        if(res.data.error == 0) {
            handleLoadRoutes(companyId)
        }
    }

    return (
        <div>
            <div>
            <Card>
                <div className="flex flex-row space-x-4 justify-center">
                    <div>
                        <Select options={listProvince} style={{ width: 200, height: 50}} defaultValue="Chọn tỉnh/thành phố" onChange={(value) => loadFirstDistrict(value)} />
                        <Select options={listFirstDistrict} style={{ width: 200, height: 50}} defaultValue="Chọn quận/huyện" onChange={(value) => setFirstDistrict(value)} />
                    </div>

                    <div className="mt-4">
                        <SwapOutlined />
                    </div>

                    <div>
                        <Select options={listProvince} style={{ width: 200, height: 50}} defaultValue="Chọn tỉnh/thành phố" onChange={(value) => loadSecondDistrict(value)} />
                        <Select options={listSecondDistrict} style={{ width: 200, height: 50}} defaultValue="Chọn quận/huyện" onChange={(value) => setSecondDistrict(value)} />
                    </div>
                    <div className="mt-2">
                        <Button onClick={handleCreateRoute} className="bg-green-700 text-white hover:bg-white">Tạo tuyến</Button>
                    </div>
                </div>   
            </Card>
            </div>
            <div className="mt-4">
                  <Card>
                    {
                         listRoute?.map((route, index) => (
                            <div>
                                <div>{`Tuyến ${index+1}`}</div>
                                <div className = "space-x-2">
                                    <Input disabled defaultValue={`${route?.startPoint.district} ${route?.startPoint.province} - ${route?.endPoint.district} ${route?.endPoint.province}`} style={{width: 800}}/>
                                    <Button className="del-btn" onClick={() => handleDeleteRoute(route.id)} icon={<DeleteFilled />}/>
                                </div>  
                            </div>
                        ))
                    }
                </Card>  
            </div>
        </div>
    )
}

export default ModalRoute