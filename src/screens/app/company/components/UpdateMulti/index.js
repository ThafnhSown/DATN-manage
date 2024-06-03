import { renderDate } from '../../../../../utils/updateMulti'
import { Modal, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useSnackbar } from "notistack"
import { apiUpdateMulti } from '../../../../../api/services'
import moment from "moment";

export const UpdateMulti = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { data, modalShow, setModalShow, old } = props
    const [applyDate, setApplyDate] = useState([])

    const disabledDate = (current) => {
		const fifteenDaysFromNow = moment().add(14, "days");
		return (current && current < moment().startOf("day")) || current > fifteenDaysFromNow.endOf("day");
	};
    const disabledSubSchedule = (current) => {
        return current && current > data.limit.to || current < data.limit.from
    }

    const getArrayDate = (value) => {
        const arr = value.map((item) => dayjs(item).valueOf())
        setApplyDate(arr)
    }

    async function handleUpdateMulti () {
        const tmp = {...data, applyDates: applyDate, oldDepartureTime: old, type: 1 }
        const subTmp = {...data, applyDates: applyDate, oldDepartureTime: old, type: 2 }
        const res = await data.limit.to ? apiUpdateMulti(subTmp) : apiUpdateMulti(tmp)

        if(!res.data.error) {
            setModalShow(false)
            enqueueSnackbar("Cập nhật thành công", {
                variant: "success"
            })
        } else {
            enqueueSnackbar("Có lỗi xảy ra", {
                variant: "error"
            })
        }

    }

    return (
        <div>
            <Modal
            open={modalShow}
            onCancel={() => setModalShow(false)}
            onOk={() => handleUpdateMulti()}
            >
                <div className='space-y-4'>
                    <h1 className='text-xl ml-2'>Áp dụng từ: </h1>
                    <DatePicker
                    disabledDate={data.limit.to ? disabledSubSchedule : disabledDate}
                    multiple={true}
                    defaultValue={[dayjs(data.limit.from)]}
                    // disabled={[true, false]}
                    onChange={(value, dateString) => {
                        getArrayDate(value)
                      }}
                    
                    >

                    </DatePicker> 
                </div>
            </Modal>
        </div>
    )
}