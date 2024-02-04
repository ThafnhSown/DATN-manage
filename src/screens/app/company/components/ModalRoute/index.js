import { apiCreateCoachRoute, apiDeleteRoute, apiGetListDistrict, apiGetListProvince } from "../../../../../api/services"
import { useEffect, useState, useMemo } from 'react' 
import { Select, Card, Button, Input, Popconfirm } from 'antd'
import { SwapOutlined, EditFilled, DeleteFilled, ArrowLeftOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestLoadListRoute } from "../../../../../redux/slices/routeSlice"
import { useNavigate } from 'react-router'
import './style.css'

const ModalRoute = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector(state => state.routeState.listRoute)
    const listProvince = useAppSelector(state => state.globalState.listProvince)
    // const [listProvince, setListProvince] = useState([])
    const [listSecondDistrict, setListSecondDistrict] = useState([])
    const [listFirstDistrict, setListFirstDistrict] = useState([])
    const [firstDistrict, setFirstDistrict] = useState()
    const [secondDistrict, setSecondDistrict] = useState()
    let listRouteMain = listRoute.filter(item => item.id %2 !=0)
    // async function loadProvince() {
    //     const res = await apiGetListProvince()
    //     const listP = res.data.data.map((p) => ({
    //         value: p.id,
    //         label: p.province
    //     }))
    //     setListProvince(listP)
    // }
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
    const okButtonProps = {
        className: 'text-green-700'
    }
    return (
        <div className="mx-16 space-y-4">
            <div className="bg-white boder rounded-xl h-12 items-center flex flex-row space-x-2">
                <ArrowLeftOutlined onClick={() => navigate("/")}/>
                <p>Tạo tuyến</p>
            </div>
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
                         listRouteMain?.map((route, index) => (
                            <div>
                                <div>{`Tuyến ${index+1}`}</div>
                                <div className = "space-x-2">
                                    <Input value={`${route?.startPoint.district}/${route?.startPoint.province} - ${route?.endPoint.district}/${route?.endPoint.province}`} style={{width: 800}}/>
                                    <Popconfirm title={<p className='text-green-700 font-bold'>Bạn muốn xóa tuyến này?</p>}
                                        okText="Có"
                                        cancelText="Không"
                                        okButtonProps={okButtonProps}
                                        onConfirm={() => handleDeleteRoute(route.id)}
                                    >
                                    <Button className="del-btn" icon={<DeleteFilled />}/>
                                    </Popconfirm>
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