import { renderDate } from '../../../../../utils/updateMulti'
import { Modal, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useSnackbar } from "notistack"
import { apiUpdateMulti } from '../../../../../api/services'

const { RangePicker } = DatePicker

export const UpdateMulti = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { data, modalShow, setModalShow, old } = props
    const [applyDate, setApplyDate] = useState([])

    const getArrayDate = (value) => {
        const arr = renderDate(value[0].valueOf(), value[1].valueOf())
        setApplyDate(arr)
    }

    async function handleUpdateMulti () {
        const tmp = {...data, applyDates: applyDate, oldDepartureTime: old, type: 1 }
        const res = await apiUpdateMulti(tmp)

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
                    <RangePicker
                    defaultValue={[dayjs(data.currentDate)]}
                    disabled={[true, false]}
                    onChange={(value, dateString) => {
                        getArrayDate(value)
                      }}
                    
                    >

                    </RangePicker> 
                </div>
            </Modal>
        </div>
    )
}