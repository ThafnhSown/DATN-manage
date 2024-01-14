import { Progress, Typography, Card } from "antd"

const { Title } = Typography

const Report = () => {

    return (
        <div className='px-24'>
            <Card title={<Title level={3}>Báo cáo</Title>}>
                <Card>
                    <Title level={5} type="success">Lượt booking</Title>
                    <b className="text-green-700 text-xl ml-4">240</b>
                    <Progress percent={24} strokeWidth={50} strokeColor="#006D38" />
                </Card>

                <Card>
                    <Title level={5} type="success">Lượt nhấp vào số hotline</Title>
                    <b className="text-green-700 text-xl ml-4">480</b>
                    <Progress percent={40} strokeWidth={50} strokeColor="#006D38"/>
                </Card>
            </Card>
        </div>
    )
}

export default Report