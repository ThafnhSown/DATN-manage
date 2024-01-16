import TransportForm from "../components/TransportForm"
import { useAppSelector } from "../../../../redux/hook"
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'

const Transport = () => {
    const id = useAppSelector(state => state.authState.userInfo.id)
    return (
        <>
            <div className="space-y-4 mx-16">
                <Card>
                    <Button icon={<PlusOutlined />} className="w-full border rounded-md h-10">Tạo thêm xe</Button>
                </Card>
                <Card>
                    <TransportForm id={id}/>
                </Card>
                
            </div>
        </>
    )
}

export default Transport