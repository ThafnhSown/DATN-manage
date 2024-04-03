import { IconCar, IconTP, IconTicket, IconMoney, MiniBlue, MiniRed } from "../../../../../assets/svgs"
import { EnvironmentFilled, UserOutlined, PhoneFilled, FormOutlined } from "@ant-design/icons"
import { Checkbox } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from "react"
import './style.css'
import { regexNumber } from "../../../../../utils/convertTime"

const UserOrder = ({ order, listOrder, setListOrder }) => {
    const [isChecked, setIsChecked] = useState(false)
    useEffect(() => {
        listOrder.includes(order) ? setIsChecked(true) : setIsChecked(false)
    }, [listOrder])

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

    return (
        <div className="w-full flex flex-col border-1 bg-white border-black shadow-xl p-2">
            <div className="grid grid-cols-2 text-lg space-x-2 items-center">
                <div className="flex flex-row mx-2 space-x-2">
                    <Checkbox onChange={handleCheckbox}  checked={isChecked}>

                    </Checkbox>
                    <div className="text-xl text-green-700">{dayjs(order.departureTime).format("HH:mm")}</div>
                    <div>{dayjs(order.departureDate).format("DD/MM/YY")}</div>
                </div>
                
                <div className="text-xs flex justify-end">{order.state == 0 ? <p className="text-red-600">Chưa liên hệ</p> : order.state == 1 ? <p className="text-green-700">Đã liên hệ</p> : <p>Đã hủy</p>}</div>
            </div>
            <div className="flex flex-row ml-5">
                <p className="flex flex-row items-center space-x-2 w-1/2"><IconTicket /><p>{order.quantity} vé</p></p>
                <p className="flex flex-row items-center space-x-2 w-1/2"><IconMoney /> <p>{regexNumber(order.price)}đ</p></p>
            </div>
            <p className="flex flex-row items-center space-x-2 ml-5"><IconCar /> <p>{order.coachType.name}</p></p>
            <div className="flex flex-row text-xs mx-6 space-x-4">
                <p className="flex flex-row space-x-1 note"><FormOutlined/>
                    <p className="font-extralight">Ghi chú</p>
                    <p className="text-xs note-detail font-extrabold">{order.note}</p>
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
                    <div>
                        {order.pickUpPoint.district}
                    </div>: Trung chuyển đón
                </div>
                <div className="font-light flex flex-row items-center space-x-1">
                    <MiniRed />
                    <div>
                        {order.dropOffPoint.district}
                    </div>
                      : Trung chuyển trả
                </div>
            </div>
            <div className="mx-2 grid grid-cols-2">
                <div>
                    <UserOutlined /> {order.passengerName}
                </div>
                <div>
                    <PhoneFilled /> {order.phoneNumber}
                </div>
            </div>
        </div>
    )
}

export default UserOrder