import React, { useEffect, useState } from 'react' 
import InfiniteScroll from 'react-infinite-scroll-component';
import { Select, Card, Button, Input, Modal, Menu, Row, Form, List, Typography, Checkbox, Col } from 'antd'
import { SaveOutlined, DeleteFilled, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { requestCreateRoute, requestLoadListRoute, requestDeleteRoute } from "../../../../../redux/slices/routeSlice"
import { apiAddPointToRoute, apiGetListDistrict, apiGetListProvince, apiGetLocation, apiGetRouteDetail, apiOfficeInDistrict } from "../../../../../api/services"
import { requestLoadListOffice } from '../../../../../redux/slices/officeSlice'
import './style.css'
import LoadingPage from "../../../../../utils/Loading";
const { Title } = Typography

const AddPointToRoute = ({currentRoute}) => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listProvince = useAppSelector(state => state.globalState.listProvince)
    const isLoading = useAppSelector((state) => state.routeState.loading)
    const [listDistrict, setListDistrict] = useState([])
    const [listPoint, setListPoint] = useState([])
    const [showP, setShowP] = useState(listProvince)
    const [showD, setShowD] = useState(false)
    const [delPoint, setDelPoint] = useState([])
    const [checked, setChecked] = useState(false)
    const dragItem = React.useRef(null)
    const dragOverItem = React.useRef(null)
    const [mapOffice, setMapOffice] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    
    const handleSort = () => {
        let _pointItems = [...listPoint]
        const dragItemContent = _pointItems.splice(dragItem.current, 1)[0];
        _pointItems.splice(dragOverItem.current, 0, dragItemContent)
        dragItem.current = null
        dragOverItem.current = null
        setListPoint(_pointItems)
    }

    useEffect(() => {
        setDelPoint([])
        // handleLoadRoutes()
    }, [])
    useEffect(() => {
        handleLoadPoint(currentRoute)
    }, [currentRoute])

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
        let officeIndex = {}
        const res = await apiGetLocation(value)
        const tmp = {
            address: `${res.data.data.district} / ${res.data.data.province}`,
            locationId: value,
        }
        const office = await apiOfficeInDistrict({companyId: companyId, districtId: value})
        officeIndex[value] = office.data.data.map(of => ({
            value: of.id,
            label: of.name
        }))
        setMapOffice({...mapOffice, ...officeIndex})
        setListPoint([...listPoint, tmp])
    }
    // async function handleLoadRoutes() {
    //     try{
    //         await dispatch(requestLoadListRoute(companyId))
    //         await dispatch(requestLoadListOffice(companyId))
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    async function handleLoadPoint(id) {
        setIsEdit(false)
        setListPoint([])
        let officeIndex = {}
        const res = await apiGetRouteDetail(id)
        await Promise.all(
            res.data.data.pointList.map(async point => {
                const office = await apiOfficeInDistrict({companyId: companyId, districtId: point.locationId})
                officeIndex[point.locationId] = office.data.data.map(of => ({
                    value: of.id,
                    label: of.name
                }))
                setMapOffice({...mapOffice, ...officeIndex})
            })
        )
        const tmp = res.data.data.pointList.map(point => {
            const son = point.officeList.map(of => {
                const index = {
                    value: of.id,
                    label: of.name
                }
                return index
            })
            point.officeList = son
            return point
        })
        setListPoint([...tmp])
    }

    async function handleAddPoint(listPoint) {
        const tmp = listPoint.map((point, index) => ({
            ...point,
            sequence: index+1
        }))
        console.log(tmp)
        const res = await apiAddPointToRoute({
            coachRouteId: currentRoute,
            pointList: tmp
        })
    }

    async function handleDelPoint(listPoint) {
        const tmp = listPoint.filter(item => !delPoint.includes(item.locationId))
        setListPoint([...tmp])
        // setListDataPoint([...tmp])
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
            setDelPoint([...delPoint, point.locationId])
        } else {
            const tmp = delPoint.filter(item => item != point.locationId)
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
                                            // setShowD(false)
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
                                        <div className='flex-row space-x-4 grid grid-cols-12'
                                            key={index}
                                            draggable
                                            onDragStart={(e) => (dragItem.current = index)}
                                            onDragEnter={(e) => (dragOverItem.current = index)}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}

                                        >
                                            <div className='col-span-4 space-x-2'>
                                                <Checkbox onChange={e => handleChecked(e, point)} />
                                                <b>{point.address} :</b>
                                            </div>
                                           <div className='col-span-8 flex flex-row space-x-2'>
                                            <Input onChange={(e) => {
                                                const tmp = {...point, description: e.target.value, isOffice: false}
                                                listPoint[index] = tmp
                                                }} placeholder={point.description} className='w-40'
                                                disabled={!isEdit}
                                                />
                                            <p>hoặc</p>
                                            <Select className='w-40' onChange={(value) => {
                                                const tmp = {...point, officeIdList: value, isOffice: true}
                                                listPoint[index] = tmp
                                            }} 
                                            mode="multiple"
                                            defaultValue={point.officeList}
                                            disabled={!isEdit}
                                            >
                                                {
                                                    mapOffice[point.locationId]?.map(({label, value}) => (
                                                        <Select.Option key={value} value={value}>
                                                            {label}
                                                        </Select.Option>
                                                    ))
                                                }
                                            </Select>
                                            </div>
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
                                <Button onClick={() => handleDelPoint(listPoint)} className='mt-10 text-white del-btn'>Xóa</Button>
                                {
                                    isEdit ? <Button onClick={() => handleAddPoint(listPoint)} className='mt-10 text-white'>Lưu</Button> : <Button onClick={() => setIsEdit(!isEdit)} className='mt-10 text-white'>Sửa</Button>
                                }
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