import { Button } from "antd"
import { DeleteFilled } from "@ant-design/icons"
import { apiDelVoucher } from "../../../../../api/services"
import { useAppSelector, useAppDispatch } from "../../../../../redux/hook"
import { requestLoadVoucher } from "../../../../../redux/slices/companySlice"
import { useSnackbar } from "notistack"

export const VoucherTag = (props) => {
    const { id, name, code, type, value, applyFrom, applyTo } = props
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const companyId = useAppSelector((state) => state.authState.userInfo.id)
    const handleDelVoucher = async () => {
        const res = await apiDelVoucher({id: id})
        if(!res.data.error) {
            enqueueSnackbar("Xóa voucher thành công", {variant: "success"})
            dispatch(requestLoadVoucher(companyId))
        }

    }

    return (
        <div className="flex flex-row space-x-1">
        <div className="flex flex-row border-2 rounded-md border-[#ede7e7] px-2 py-1 w-full space-x-1">
            <p className="italic">{name} </p>
            <p>: {code}</p>
        </div>
        
        <Button className="del-btn" onClick={() => {
            handleDelVoucher(id)
        }} icon={<DeleteFilled />} />
        </div>
        
    )
}