import React, { useEffect, useState } from 'react' 
import InfiniteScroll from 'react-infinite-scroll-component';
import { Select, Card, Button, Input, Row, List, Typography, Checkbox, Col } from 'antd'
import { ArrowLeftOutlined, SearchOutlined, CheckOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from "../../../../../redux/hook"
import { apiAddPointToRoute, apiGetListDistrict, apiGetLocation, apiGetRouteDetail, apiOfficeInProvince } from "../../../../../api/services"
import './style.css'
import LoadingPage from "../../../../../utils/Loading";
import { requestLoadPoint } from '../../../../../redux/slices/routeSlice';
import { requestLoadProvince } from '../../../../../redux/slices/globalSlice';
const { Title } = Typography

const AddPointToRoute = ({currentRoute}) => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listProvince = useAppSelector(state => state.globalState.listProvince)
    const isLoading = useAppSelector((state) => state.routeState.pointLoading)
    const currentListPoint = useAppSelector(state => state.routeState.currentListPoint)
    const [listDistrict, setListDistrict] = useState([])
    const [listPoint, setListPoint] = useState([])
    const [showP, setShowP] = useState(listProvince)
    const [showD, setShowD] = useState(false)
    const [delPoint, setDelPoint] = useState([])
    const [pickPoint, setPickPoint] = useState([])
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
        // setListPoint(list)
    }

    useEffect(() => {
        dispatch(requestLoadProvince())
    }, [])

    useEffect(() => {
        handleLoadPoint(currentRoute)
        setDelPoint([])
        setPickPoint([])
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
        setPickPoint([...pickPoint, value])
        let check = 0
        listPoint.map(point => {
            if(point.locationId === value) check = 1 
        })
        let officeIndex = {}
        const res = await apiGetLocation(value)
        const tmp = {
            address: `${res.data.data.district} / ${res.data.data.province}`,
            locationId: value,
        }
        const office = await apiOfficeInProvince({companyId: companyId, locationId: res.data.data.provinceId})
        officeIndex[value] = office.data.data.map(of => ({
            value: of.id,
            label: of.name
        }))
        setMapOffice({...mapOffice, ...officeIndex})
        if(isEdit && !check) {
            setListPoint([...listPoint, tmp])
        }
    }

    async function handleLoadPoint(id) {
        dispatch(requestLoadPoint(id))
        setIsEdit(false)
        setListPoint([])
        let officeIndex = {}
        const res = await apiGetRouteDetail(id)
        await Promise.all(
            res.data.data.pointList.map(async point => {
                const office = await apiOfficeInProvince({companyId: companyId, locationId: point.location.provinceId})
                officeIndex[point.locationId] = office.data.data.map(of => ({
                    value: of.id,
                    label: of.name
                }))
                setMapOffice({...mapOffice, ...officeIndex})
            })
        )
        const tmp = res.data.data.pointList.map(point => {
            const son = point.officeIdList
            point.officeIdList = son
            return point
        })
        tmp.length ? setIsEdit(false) : setIsEdit(true)
        setListPoint([...tmp])
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
        if(!res.data.error) {
            setIsEdit(false)
        }
    }

    async function handleDelPoint(listPoint) {
        const tmp = listPoint.filter(item => !delPoint.includes(item.locationId))
        setListPoint([...tmp])
        setPickPoint([])
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
        {
            isLoading ? <LoadingPage /> : <div>
            <div>
                <div className="flex flex-row mt-6 space-x-4">
                    <div className={`w-1/4 ${isEdit ? '' : 'opacity-35'}`} >
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

                                <Title level={4}>Tỉnh / Thành</Title>
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
                                                if(isEdit) {
                                                    setShowD(true)
                                                    loadDistrict(item.value)
                                                }
                                            }}
                                        >
                                            <div className='cursor-pointer'>{item.label}</div>
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
                                        }}
                                    className={`${pickPoint.includes(item.value) ? 'bg-neutral-200' : ''}`}
                                    >
                                        <div className='grid grid-cols-6 w-full'>
                                            <div className='cursor-pointer col-span-5'>{item.label}</div>
                                            <div className={`flex justify-end col-span-1 ${pickPoint.includes(item.value) ? 'opacity-100' : 'opacity-0'}`}><CheckOutlined style={{color: 'green'}}/></div>
                                        </div>
                                        
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
                        <InfiniteScroll
                            dataLength={10}
                        >

                        </InfiniteScroll>
                        <div>
                        {
                            listPoint.length ? <div className='space-y-3'>
                                {
                                    listPoint.map((point, index) => {
                                        return (
                                        <>
                                        <div className='flex-row grid grid-cols-3'
                                            key={index}
                                            draggable={isEdit}
                                            onDragStart={(e) => (dragItem.current = index)}
                                            onDragEnter={(e) => (dragOverItem.current = index)}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            <div className='space-x-2 col-span-1'>
                                                <Checkbox checked={delPoint.includes(point.locationId)} onChange={e => handleChecked(e, point)} disabled={!isEdit}/>
                                                <b className='cursor-default'>{point.address} :</b>
                                            </div>
                                           <div className='flex flex-row space-x-2 justify-end col-span-2'
                                           draggable={true}
                                           onDragStart={(e) => e.preventDefault()}
                                           >
                                            <Input onChange={(e) => {
                                                const tmp = {...listPoint[index], description: e.target.value}
                                                listPoint[index] = tmp
                                                }} defaultValue={point.description} className='w-1/2'
                                                disabled={!isEdit}
                                                />
                                            <p>hoặc</p>
                                            <Select className='w-1/2' onChange={(value) => {
                                                const tmp = {...listPoint[index], officeIdList: value}
                                                listPoint[index] = tmp
                                            }}
                                            mode="multiple"
                                            defaultValue={point.officeIdList}
                                            disabled={!isEdit}
                                            options={mapOffice[point.locationId]}
                                            >
                                            </Select>
                                            </div>
                                        </div>
                                        </>
                                    )})
                                    
                                }
                            </div> : null
                        }
                        <div className='grid grid-cols-2'>
                            <div>
                                { listPoint.length ? <p className='mt-10'><Checkbox onChange={(e) => {
                                    if(e.target.checked) {
                                        setDelPoint(listPoint.map(point => point.locationId))
                                    } else {
                                        setDelPoint([])
                                    }
                                }} disabled={!isEdit}/> Chọn tất cả</p> : null}
                            </div>
                            <div className='flex justify-end'>
                                {
                                    listPoint.length | isEdit ? <div>
                                {
                                    isEdit && <Button onClick={() => {
                                        handleLoadPoint(currentRoute)
                                        setIsEdit(!isEdit)
                                        setPickPoint([])
                                    }} className='mt-10 text-white pause-btn'>Hủy</Button>
                                }
                                {
                                    isEdit && <Button onClick={() => handleDelPoint(listPoint)} className='mt-10 text-white del-btn'>Xóa</Button>
                                    
                                }
                                {
                                    isEdit ? <Button onClick={() => handleAddPoint(listPoint)} className='mt-10 text-white'>Lưu</Button> : <Button onClick={() => setIsEdit(true)} className='mt-10 text-white'>Sửa</Button>
                                }
                                    </div> : null
                                }
                               
                            </div>
                        </div>
                        </div>
                            {/* <Button onClick={() => console.log(listPoint)}>sss</Button>  */}
                        </Card>   
                    </div>
                </div>
            </div>
            </div>
        }
         

        </>
    )
}

export default AddPointToRoute