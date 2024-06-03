import { apiGetStatistic } from "../../../../api/services"
import { useAppSelector } from "../../../../redux/hook"
import { Progress, Typography, Card } from "antd"
import { useEffect, useState } from "react"

const { Title } = Typography

const Report = () => {
    const id = useAppSelector(state => state.authState.userInfo.id)
    const [data, setData] = useState({})

    const handleLoadData = async () => {
        const res = await apiGetStatistic(id)
        if(!res.data.error) {
            setData(res.data.data)
        }
    }

    useEffect(() => {
        handleLoadData()
    }, [])

    return (
        <div className='px-24'>
            <Card title={<Title level={3}>Báo cáo</Title>}>
                <Card>
                    <Title level={5} type="success">Lượt booking</Title>
                    <b className="text-green-700 text-xl ml-4">{data.booking}</b>
                    <Progress percent={data.booking / 10} strokeWidth={50} strokeColor="#006D38" />
                </Card>

                <Card>
                    <Title level={5} type="success">Lượt nhấp vào số hotline</Title>
                    <b className="text-green-700 text-xl ml-4">{data.hotlineClicked}</b>
                    <Progress percent={data.hotlineClicked / 10} strokeWidth={50} strokeColor="#006D38"/>
                </Card>
            </Card>
        </div>
    )
}

export default Report