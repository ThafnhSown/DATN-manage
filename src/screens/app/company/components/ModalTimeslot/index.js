import { Modal, DatePicker, Button } from "antd"
import TimeSlotCard from "../TimeSlotCard"
import dayjs from 'dayjs'
import { useState } from "react"
import { useAppSelector } from "../../../../../redux/hook"
import { useSnackbar } from "notistack"

export const ModalTimeslot = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { modalShow, setModalShow } = props
    const [ currentTimeslot, setCurrentTimeslot ] = useState({})
    const [ listTimeSlot, setListTimeSlot ] = useState([])
    const [applyDate, setApplyDate] = useState([])
    const currentRoute = useAppSelector(state => state.routeState.currentRoute)

    const getArrayDate = (value) => {
        const arr = value.map((item) => dayjs(item).valueOf())
        setApplyDate(arr)
    }

    const handleCreateMulti = async () => {
        const data = {
            ...listTimeSlot[0],
            applyDates: applyDate,
            coachRouteId: currentRoute,
            type: 1
        }

        const res = await apiCreateMulti(data)
        if(!res.data.error) {
            enqueueSnackbar("Tạo lịch thành công", {variant: "success"})
            setModalShow(false)
        }
    }

    return (
        <Modal
        onCancel={() => setModalShow(false)}
        open={modalShow}
        onOk={() => handleCreateMulti()}
        width={1200}
        >
             <DatePicker
                
                style={{width: 400}}
                    multiple={true}
                    onChange={(value, dateString) => {
                        getArrayDate(value)
                      }}
                      placeholder="Chọn ngày áp dụng"
                    >

                    </DatePicker> 
            <TimeSlotCard schedule={currentTimeslot} index={0} listTimeSlot={listTimeSlot} setListTimeSlot={setListTimeSlot} isEdit={false} setCurrentTimeslot={setCurrentTimeslot} scheduleId={0} limit={{from: 0, to: 0}}/>
        </Modal>
    )
}