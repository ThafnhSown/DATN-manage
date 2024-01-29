import { useEffect, useState } from 'react' 
import InfiniteScroll from 'react-infinite-scroll-component';
import { Select, Card, Button, Input, Modal, Menu, Row, Form, List, Typography, Checkbox, Col } from 'antd'
import { SaveOutlined, DeleteFilled, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestCreateRoute, requestLoadListRoute, requestDeleteRoute } from "../../../../../redux/slices/routeSlice"
import { apiAddPointToRoute, apiGetListDistrict, apiGetListProvince, apiGetLocation, apiGetRouteDetail } from "../../../../../api/services"
import { requestLoadListOffice } from '../../../../../redux/slices/officeSlice'
import './style.css'
const { Title } = Typography

const AddPointToRoute = ({currentRoute}) => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listRoute = useAppSelector((state) => state.routeState.listRoute)
    const listOffice = useAppSelector((state) => state.officeState.listOffice)
    // const [currentRoute, setCurrentRoute] = useState()
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listPoint, setListPoint] = useState([])
    const [listDataPoint, setListDataPoint] = useState([])
    const [showP, setShowP] = useState([])
    const [showD, setShowD] = useState(false)
    const [delPoint, setDelPoint] = useState([])
    const [checked, setChecked] = useState(false)
  
    useEffect(() => {
        setDelPoint([])
        loadProvince()
        handleLoadRoutes()
    }, [])
    useEffect(() => {
        handleLoadPoint(currentRoute)
    }, [currentRoute])
    const son = listOffice.map(e => ({
        value: e.id,
        label: e.name
    }))
    async function loadProvince() {
        const res = await apiGetListProvince()
        const listP = res.data.data.map((p) => ({
            value: p.id,
            label: p.province
        }))
        setListProvince(listP)
        setShowP(listP)
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
            address: `${res.data.data.district}/${res.data.data.province}`,
            locationId: value,
        }
        setShowD(true)
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
        setListPoint([...res.data.data.pointList])
        setListDataPoint([...res.data.data.pointList])
    }

    async function handleAddPoint(listPoint) {
        const tmp = listPoint.map((point, index) => ({
            ...point,
            sequence: index+1
        }))
        const res = await apiAddPointToRoute({
            coachRouteId: currentRoute,
            pointList: tmp
        })
        console.log(res)
    }

    async function handleDelPoint(listPoint) {
        const tmp = listPoint.filter(item => !delPoint.includes(item.address))
        setListPoint([...tmp])
        setListDataPoint([...tmp])
    }

    const onSearch = (e) => {
        const value = e.target.value
        if(value == '') {
            setShowP(listProvince)
        } else {
            const tmp = listProvince.filter(e => e.label.includes(value))
            setShowP(tmp)
        }
    };

    const handleChecked = (e, point) => {
        if (e.target.checked) {
            setDelPoint([...delPoint, point.address])
        } else {
            const tmp = delPoint.filter(item => item != point.address)
            setDelPoint([...tmp])
        }
    }

    return (
        <>
            <div>
                <div>
                    <div className="flex flex-row mt-6 space-x-4">
                        <div className="w-1/4" >
                            <Card style={{
                                height: 400,
                                overflow: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            }}>
                                <InfiniteScroll
                                dataLength={10}>
                                    {
                                        !showD ? <div>

                                    <Title level={3}>Tỉnh / Thành</Title>
                                    <Input
                                        onChange={onSearch}
                                        placeholder='Tìm kiếm'
                                        allowClear
                                        prefix={<SearchOutlined />}
                                        
                                    />
                                    
                                    <List
                                        dataSource={showP}
                                        renderItem={(item) => (
                                            <List.Item key={item.value}
                                                onClick={() => {
                                                    setShowD(true)
                                                    loadDistrict(item.value)
                                                }}
                                            >
                                                <div>{item.label}</div>
                                            </List.Item>
                                        )}
                                    />
                                        </div> : <div>
                                        <ArrowLeftOutlined onClick={() => setShowD(false)}/>
                                        <List
                                    dataSource={listDistrict}
                                    renderItem={(item) => (
                                        <List.Item key={item.value}
                                            onClick={() => {
                                                handleChooseDistrict(item.value)
                                                setShowD(false)
                                            }}
                                        >
                                            <div>{item.label}</div>
                                        </List.Item>
                                    )}
                                />
                                    </div>
                                    }
                                    
                                </InfiniteScroll>
                            
                            </Card>
                        </div>
                        <div className="w-3/4">
                            <Card>
                            {
                                listPoint.length ? <div className='space-y-3'>
                                    {
                                        listPoint.map((point, index) => {
                                            return (
                                            <>
                                            <div className='flex-row space-x-4 grid grid-cols-12'>
                                                <div className='col-span-4 space-x-2'>
                                                    <Checkbox onChange={e => handleChecked(e, point)} />
                                                    <b>{point.address} :</b>
                                                </div>
                                               <div className='col-span-8 flex flex-row space-x-2'>
                                                <Input onBlur={(e) => {
                                                    const tmp = {...point, description: e.target.value, isOffice: false}
                                                    setListDataPoint([...listDataPoint, tmp])
                                                    }} placeholder={point.description} className='w-40'/>
                                                <p>hoặc</p>
                                                <Select className='w-40' placeholder={point.isOffice ? point.office.name : 'Văn phòng'} onChange={(value) => {
                                                    const tmp = {...point, officeId: value, isOffice: true}
                                                    setListDataPoint([...listDataPoint, tmp])
                                                }} >
                                                    {
                                                        son.map(({label, value}) => (
                                                            <Select.Option key={value} value={value}>
                                                                {label}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                                </div>
                                                {/* <div className='col-span-2 space-x-1'> */}
                                                {/* <Button onClick={() => {
                                                    let isOffice = true
                                                    if(!abc.officeId) isOffice = false;
                                                    const vn = {...point, ...abc, sequence: index+1, isOffice: isOffice}
                                                    setListDataPoint([...listDataPoint, vn])
                                                }}
                                                icon={<SaveOutlined />}
                                                className='save-btn'
                                                /> */}
                                                {/* <Button onClick={() => {
                                                    listPoint.splice(index, 1)
                                                    setListPoint([...listPoint])
                                                }}
                                                className='del-btn'
                                                icon={<DeleteFilled />}
                                                /> */}
                                                {/* </div>                                        */}
                                            </div>
                                               
                                            </>
                                        )})
                                        
                                    }
                                </div> : null
                            }
                            <Row grid={12}>
                                <Col span={4}>
                                    <p className='mt-10'><Checkbox onChange={() => setChecked(!checked)}/> Chọn tất cả</p>
                                </Col>
                                <Col span={16}/>
                                <Col span={4}>
                                    <Button onClick={() => handleDelPoint(listDataPoint)} className='mt-10 text-white del-btn'>Xóa</Button>
                                    <Button onClick={() => handleAddPoint(listDataPoint)} className='mt-10 text-white'>Lưu</Button>
                                </Col>
                            </Row>
                          
                           
                            </Card>   
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPointToRoute
// chon 1 diem them vao del point, bam xoa thi xoa, khong thi 