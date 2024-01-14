import { Card, Row, Typography, Col} from 'antd'
import { useState } from 'react'
import { DownOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import NumCalculator from 'antd/es/theme/util/calc/NumCalculator';
const {Title} = Typography

const PolicyCard = () => {
    const [status, setStatus] = useState(true)
    return (
        <>
            <div>
            <Card 
                title={<Title level={4}>Tên chính sách</Title>} 
                extra={<Row className='space-x-3'>
                    <div><EditFilled /> Sửa</div>
                    <div><DeleteFilled /> Xóa</div>
                </Row>}>
                    <Row>
                        <Col span={3}>
                            <Title level={4}>Nội dung</Title>
                        </Col>
                        <Col span={18}/>
                        <Col span={3}>
                            {status ? 'Chi tiết' : 'Thu gọn'} <DownOutlined onClick={() => setStatus(!status)}/>
                        </Col>
                       
                    </Row>

                    { status ? 'Nội dung chính sách': null}
                </Card>
            </div>
        </>
    )
}

export default PolicyCard