import TransportForm from "../components/TransportForm"
import { useAppSelector, useAppDispatch } from "../../../../redux/hook"
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import { requestLoadCoach } from "../../../../redux/slices/companySlice"
import { apiGetCoaches } from "../../../../api/services"
import { useEffect, useState } from "react"

const Transport = () => {
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.authState.userInfo.id)
    const listCoach = useAppSelector(state => state.companyState.listCoach)
    const [isCreate, setIsCreate] = useState(false)
    const [options, setOptions] = useState([])
    useEffect(() => {
        handleLoadCoach()
        handleLoadOptions()
    },[])

    const handleLoadCoach = async () => {
        try {
            await dispatch(requestLoadCoach(id))
        } catch (err){
            console.log(err)
        }
    }

    async function handleLoadOptions() {
        const res = await apiGetCoaches()
        const listCoach = res.data.data.map((coach) => ({
            label: coach.name,
            value: coach.id
        }))
        setOptions(listCoach)
    }
    return (
        <>
            <div className="space-y-4 mx-16">
                <Card>
                    <Button icon={<PlusOutlined />} className="w-full border rounded-md h-10" onClick={() => setIsCreate(!isCreate)}>Tạo thêm xe</Button>
                </Card>
                {
                    isCreate && <Card>
                        <TransportForm setIsCreate={setIsCreate} options={options}/>
                    </Card>
                }
                {
                    listCoach.map(coach => (
                        <Card>
                            <TransportForm transport={coach} options={options}/>
                        </Card>
                    ))
                }  
            </div>
        </>
    )
}

export default Transport