import { apiCreateTravelPath, apiDelTravelPath, apiGetTravelPathList } from "../../../../api/services"
import { Card, Input, Button, Form, Popconfirm } from 'antd'
import { useAppSelector } from "../../../../redux/hook"
import { ArrowLeftOutlined, DeleteFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { useEffect, useState } from "react"
import { useSnackbar } from 'notistack'

const TravelPath = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const [listTP, setListTP] = useState([])
    const handleCreateTP = async () => {
        const data = form.getFieldsValue()
        const res = await apiCreateTravelPath({...data, coachCompanyId: companyId})
        if(res.data.error == 0) {
            handleLoadTP()
            form.resetFields()
            enqueueSnackbar("Tạo lộ trình thành công", {
				variant: "success"
			})
        } else {
            enqueueSnackbar("Lỗi khi tạo lộ trình", {
				variant: "error"
			})
        }
    }
    const handleLoadTP = async () => {
        const res = await apiGetTravelPathList(companyId)
        if(res.data.error == 0) {
            setListTP(res.data.data)
        }
    }
    const handleDelTP = async (id) => {
        const res = await apiDelTravelPath(id)
        if(res.data.error == 0) {
            enqueueSnackbar("Xóa lộ trình thành công", {
				variant: "success"
			})
            handleLoadTP()
        } else {
            enqueueSnackbar("Lỗi khi xóa lộ trình", {
				variant: "error"
			})
        }
    }
    useEffect(() => {
        handleLoadTP()
    }, [])
    const okButtonProps = {
        className: 'text-green-700'
    }

    return (
        <div className="mx-16 space-y-4">
            <div className="bg-white boder rounded-xl h-12 items-center flex flex-row space-x-2">
                <ArrowLeftOutlined onClick={() => navigate("/")}/>
                <p>Tạo lộ trình</p>
            </div>
            <Card>
                <Form
                form={form}
                onFinish={handleCreateTP}
                >
                    <Form.Item name="name" label="Tên lộ trình">
                        <Input placeholder="Nhập tên lộ trình" />
                    </Form.Item>

                    <Form.Item name="detail" label="Lộ trình">
                        <Input placeholder="Nhập lộ trình" />
                    </Form.Item>
                    <Button htmlType='submit'>Xác nhận</Button>
                </Form>
           
            </Card>
            {
                listTP.map((tp, index) => (
                    <Card>
                        <div className="grid grid-cols-12">
                            <p className="col-span-10 truncate">{`${tp.name} : ${tp.detail}`} </p>
                            <div className="col-span-1"/>
                            <div className="col-span-1 flex flex-row items-center justify-center">
                            <Popconfirm title={<p className='text-green-700 font-bold'>Bạn muốn xóa lộ trình này?</p>}
                            okText="Có"
                            cancelText="Không"
                            okButtonProps={okButtonProps}
                            onConfirm={() => handleDelTP(tp.id)}
                            >
                            <a className="text-red-700" ><DeleteFilled /> Xóa</a>
                            </Popconfirm>
                            </div>
                        </div>
                        
                    </Card>
                ))
            }
        </div>
    ) 
}

export default TravelPath