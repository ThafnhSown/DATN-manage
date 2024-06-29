import { IconCar, IconTP, IconTicket, IconMoney, MiniBlue, MiniRed } from "../../../../../assets/svgs"
import { UserOutlined, PhoneFilled, FormOutlined } from "@ant-design/icons"
import { Button, Checkbox } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from "react"
import './style.css'
import { regexNumber, convertSecondsToDayjs } from "../../../../../utils/convertTime"
import OfficeAtPoint from "../OfficeAtPoint"
import { apiGetVoucherById } from "../../../../../api/services"

const UserOrder = ({ order, listOrder, setListOrder }) => {
    const [isChecked, setIsChecked] = useState(false)
    const [startPointOffice, setStartPointOffice] = useState(false)
    const [endPointOffice, setEndPointOffice] = useState(false)
    const [voucher, setVoucher] = useState({})

    const handleCheckbox = (e) => {
        if(e.target.checked) {
            setIsChecked(true)
            setListOrder([...listOrder, order])
        } else {
            setIsChecked(false)
            const tmp = listOrder.filter(od => od.id != order.id)
            setListOrder([...tmp])
        }
    }

    const handleGetVoucher = async () => {
        const res = await apiGetVoucherById(order?.voucherId)
        if(!res.data.error) {
            setVoucher(res.data.data)
        }
        else {
            setVoucher({
                discount: 0,
                discountType: 0
            })
        }
    }

    useEffect(() => {
        handleGetVoucher()
        listOrder.includes(order) ? setIsChecked(true) : setIsChecked(false)
    }, [listOrder])


    return (
        <div className="w-full flex flex-col border-1 bg-white border-black shadow-xl p-2">
            <div className="grid grid-cols-2 text-lg space-x-2 items-center">
                <div className="flex flex-row mx-2 space-x-2">
                    <Checkbox onChange={handleCheckbox}  checked={isChecked}>

                    </Checkbox>
                    <div className="text-xl text-green-700">{dayjs(convertSecondsToDayjs(order.departureTime)).format("HH:mm")}</div>
                    <div>{dayjs(order.departureDate).format("DD/MM/YY")}</div>
                </div>
                
                <div className="text-xs flex justify-end">{order.state == 0 ? <p className="text-red-600">Chưa liên hệ</p> : order.state == 1 ? <p className="text-green-700">Đã liên hệ</p> : <p>Đã hủy</p>}</div>
            </div>
            <div className="flex flex-row ml-5">
                <p className="flex flex-row items-center space-x-2 w-1/2"><IconTicket /><p>{order.quantity} vé</p></p>
                <p className="flex flex-row items-center space-x-2 w-1/2"><IconMoney /> <p>{regexNumber(voucher.discountType ?  order.price*order.quantity - voucher.discount :  order.price*order.quantity - ( order.price*order.quantity*voucher.discount)/100)}đ</p></p>
            </div>
            <p className="flex flex-row items-center space-x-2 ml-5"><IconCar /> <p>{order.coachType.name}</p></p>
            <div className="flex flex-row text-xs mx-6 space-x-4">
                <p className="flex flex-row space-x-1 items-center"><FormOutlined/>
                    <p className="font-extralight text-base">Ghi chú:</p>
                    <p className="font-extrabold text-base">{order.note}</p>
                </p>
               
             </div>
            <div class="w-full mt-2 h-1 border-t border-dashed border-black"></div>
            <div className="flex flex-col mx-2">
                <div className="flex flex-row space-x-1 items-center">
                    <IconTP /> 
                    <div className="font-light flex flex-row w-full space-x-1">
                        <p>Lộ trình: </p>
                        <p className="font-light">{order.travelPath.name}</p>
                    </div>
                </div>
                <div className="font-light flex flex-row items-center space-x-1">
                    <MiniBlue />
                    <p className='truncate flex flex-row space-x-2 chi-tiet'>
                        <p className='font-extrabold'>{order.startPoint.location.district}:</p>                      
                        <p className='font-light'>{order.startPoint.description} </p>
                    </p>
                    <a className='text-green-700 cursor-pointer' onClick={() => setStartPointOffice(true)}>Xem thêm</a>
                </div>
                <div className="font-light flex flex-row items-center space-x-1">
                    <MiniRed />
                    <p className='truncate flex flex-row space-x-2 chi-tiet'>
                        <p className='font-extrabold'>{order.endPoint.location.district}:</p>
                        <p className='font-light'>{order.endPoint.description}</p>
                    </p>
                    <a className='text-green-700 cursor-pointer' onClick={() => setEndPointOffice(true)}>Xem thêm</a>
                </div>
            </div>
            <div className="mx-2 grid grid-cols-2">
                <div>
                    <UserOutlined /> {order.passengerName}
                </div>
                <a href={`tel:${order.phoneNumber}`}>
                    <PhoneFilled /> {order.phoneNumber}
                </a>
            </div>
            {
                startPointOffice && <OfficeAtPoint data={order.startPoint} modalShow={startPointOffice} setModalShow={setStartPointOffice}/>
            }
            {
                endPointOffice && <OfficeAtPoint data={order.endPoint} modalShow={endPointOffice} setModalShow={setEndPointOffice}/>
            }
        </div>
    )
}

export default UserOrder