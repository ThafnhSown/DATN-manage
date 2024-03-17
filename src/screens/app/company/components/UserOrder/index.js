import { IconCar, IconTP, IconTicket, IconMoney } from "../../../../../assets/svgs"
import { EnvironmentFilled, UserOutlined, PhoneFilled, FormOutlined } from "@ant-design/icons"
import { Checkbox } from 'antd'
import dayjs from 'dayjs'
import './style.css'

const UserOrder = ({ order, listOrder, setListOrder }) => {

    const handleCheckbox = (e) => {
        if(e.target.checked) {
            setListOrder([...listOrder, order])
            console.log(order)
        } else {
            const tmp = listOrder.filter(order => order.id != order.id)
            setListOrder([...tmp])
        }
    }

    return (
        <div className="w-full flex flex-col border-1 bg-white border-black shadow-xl p-2">
            <div className="grid grid-cols-2 text-lg space-x-2 items-center">
                <div className="flex flex-row mx-2 space-x-2">
                    <Checkbox onChange={handleCheckbox}>

                    </Checkbox>
                    <div className="text-xl text-green-700">{dayjs(order.departureTime).format("HH:mm")}</div>
                    <div>{dayjs(order.departureDate).format("DD/MM/YY")}</div>
                </div>
                
                <div className="text-xs flex justify-end">{order.state == 0 ? <p className="text-red-600">Chưa liên hệ</p> : order.state == 1 ? <p className="text-green-700">Đã liên hệ</p> : <p>Đã hủy</p>}</div>
            </div>
            <div className="flex flex-row space-x-6">
                <div/>
                <p className="flex flex-row items-center space-x-2"><IconTicket /><p>{order.quantity} vé</p></p>
                <p className="flex flex-row items-center space-x-2"><IconMoney /> <p>{order.price}đ</p></p>
                <p className="flex flex-row items-center space-x-2"><IconCar /> <p>{order.coachType.name}</p></p>
            </div>
            <div className="flex flex-row text-xs mx-6 space-x-4">
                <p className="flex flex-row space-x-1 note"><FormOutlined/>
                    <p className="font-extralight">Ghi chú</p>
                    <p className="font-extralight text-xs note-detail">{order.note}</p>
                </p>
               
             </div>
            <div class="w-full mt-2 h-1 border-t border-dashed border-black"></div>
            <div className="flex flex-col mx-2">
                <div className="flex flex-row space-x-2 items-center">
                    <IconTP /> <div className="font-light truncate">Lộ trình: {order.travelPath.detail}</div>
                </div>
                <div className="font-light">
                    <EnvironmentFilled style={{color: "blue"}}/> {order.pickUpPoint.district} = Trung chuyển đón
                </div>
                <div className="font-light">
                    <EnvironmentFilled style={{color: "red"}}/> {order.dropOffPoint.district} = Trung chuyển trả
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