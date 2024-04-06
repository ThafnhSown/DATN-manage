import { requestLoadOrder } from "../../../../redux/slices/companySlice"
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { addNewOrder } from "../../../../redux/slices/companySlice"
import { useEffect, useState } from "react"
import UserOrder from "../components/UserOrder"
import InfiniteScroll from "react-infinite-scroll-component"
import { Button, Checkbox } from 'antd'
import { DeleteFilled } from '@ant-design/icons';
import "./style.css"
import { apiChangeOrderState } from "../../../../api/services"
import SockJS from "sockjs-client"
import Stomp from 'stompjs'



const Booking = () => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const listOrder = useAppSelector(state => state.companyState.listOrder)
    const [orderState, setOrderState] = useState(0)
    const [listOrderPick, setListOrderPick] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    function connect(companyId, currentOrder, setCurrentOrder, orderState) {
        let socket = new SockJS(`${process.env.REACT_APP_ENDPOINT}/bookings`);
        let stompClient = Stomp.over(socket);
      
        stompClient.connect({}, function (frame) {
          stompClient.subscribe("/topic/bookings", function (message) {
            
            let tmp = JSON.parse(message?.body)
            if(tmp.companyId == companyId && orderState == 0) {
                dispatch(addNewOrder(tmp))
            }
          });
        });
      }
    useEffect(() => {
        dispatch(requestLoadOrder(companyId))
        setCurrentOrder(listOrder.filter(order => order.state == 0))
        connect(companyId, currentOrder, setCurrentOrder, orderState)
    }, [])

    useEffect(() => {
        if(!orderState) {
            setCurrentOrder(listOrder.filter(order => order.state == 0))
        }
    }, [listOrder])

    const handleChangeState = (state) => {
        const tmp = listOrder.filter(order => order.state == state)
        setCurrentOrder(tmp)
        setOrderState(state)
    }
    const handleDeleteOrder = async () => {
        const listId = listOrderPick.map(order => order.id)
        const res = await apiChangeOrderState({
            orderIdList: listId,
            state: -1
        })
        if(res.data.error == 0) {
            dispatch(requestLoadOrder(companyId))
            setListOrderPick([])
            let tmp = currentOrder.filter(order => !listId.includes(order.id))
            setCurrentOrder([...tmp])
        }
    }

    const handleAcceptOrder = async () => {
        const listId = listOrderPick.map(order => order.id)
        const res = await apiChangeOrderState({
            orderIdList: listId,
            state: 1
        })
        if(res.data.error == 0) {
            dispatch(requestLoadOrder(companyId))
            setListOrderPick([])
            let tmp = currentOrder.filter(order => !listId.includes(order.id))
            setCurrentOrder([...tmp])
        }
    }


    return (
        <div className="flex flex-col items-center max-h-screen">
            <div className="w-3/4 h-12 p-2 flex flex-row items-center space-x-4 rounded-md sticky top-4" style={{backgroundColor: '#006D38'}}>
                <div className={`w-1/3 h-10 flex items-center justify-center rounded-md ml-1 ${orderState == 0 ? 'text-black bg-white' : 'text-white'}`} onClick={() => handleChangeState(0)}>
                    Vé mới
                </div>
                <div className={`w-1/3 h-10 flex items-center justify-center rounded-md ${orderState == 1 ? 'text-black bg-white' : 'text-white'}`} onClick={() => handleChangeState(1)}>
                    Đã liên hệ
                </div>
                <div className={`w-1/3 h-10 flex items-center justify-center rounded-md mr-2 ${orderState == -1 ? 'text-black bg-white' : 'text-white'}`} onClick={() => handleChangeState(-1)}>   
                    Đã hủy
                </div>
            </div>
           
            <div className="flex overflow-auto mobile:w-full desktop:w-3/4 mt-6" style={{height: '800px'}}>
                <InfiniteScroll className="order-list" dataLength={10}>
                    <div className="gap-4 w-full mobile:flex mobile:flex-col desktop:grid desktop:grid-cols-2">
                        {
                            currentOrder.map(order => <UserOrder order={order} listOrder={listOrderPick} setListOrder={setListOrderPick}/>)
                        }
                    </div>
                
                </InfiniteScroll>
             
            </div>
            <div className="flex flex-col mt-4 mobile:w-full desktop:w-3/4 bg-white sticky bottom-0">
                <div className="flex justify-end mr-6 space-x-2">
                    <p>{listOrder.filter(or => or.state == 0).length} chưa xác nhận |</p>
                    <p>{listOrder.filter(or => or.state == 1).length} đã liên lạc</p>
                </div>
                <div className="grid grid-cols-2 mr-6">
                    <Checkbox className="items-center mx-2" onClick={(e) => {
                        if(e.target.checked) {
                            setListOrderPick(currentOrder)
                        } else {
                            setListOrderPick([])
                        }
                    }}>Tất cả</Checkbox>
                    <div className="flex justify-end">
                        <Button className="del-btn" onClick={() => {
                            handleDeleteOrder()
                        }} icon={<DeleteFilled />} />
                        <Button
                         onClick={() => handleAcceptOrder()}
                        >Đã liên lạc với khách</Button>
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default Booking