import OfficeCard from "../components/OfficeCard"
import OfficeForm from "../components/OfficeForm"
import { Card, Button, Select } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import ModalRoute from "../components/ModalRoute";
import AddPointToRoute from "../components/AddPointToRoute";
import { useState } from "react";

const Location = () => {
    const [office, setOffice] = useState(false)
    const [route, setRoute] = useState(false)
    const [point, setPoint] = useState(false)
    return (
        <div className="px-24 space-y-4">
            <div>
                <Card>
                    <Button onClick={() => setOffice(!office)} className="h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mx-1 mt-4" icon={<PlusOutlined />}>Văn phòng</Button>
                    <Button onClick={() => setRoute(!route)} className="h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mx-1 mt-4" icon={<PlusOutlined />}>Lộ trình</Button>
                    <Button onClick={() => setPoint(!point)} className="h-10 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mx-1 mt-4" icon={<PlusOutlined />}>Tuyến</Button>
                </Card>
            </div>
            {
                office && <div>
                    <OfficeForm />
                </div>
            }
            {
                point && <div>
                    <ModalRoute />
                </div>
            }
            {
                route && <div>
                    <AddPointToRoute />
                </div>
            }
        </div>
    )
}

export default Location