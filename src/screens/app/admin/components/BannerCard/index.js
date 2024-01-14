import { MenuOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row } from 'antd'


const BannerCard = ({banner}) => {
    return (
        <>
            <Row gutter={[8, 8]}>
                <Col className='flex items-center justify-center mr-4'>
                    <MenuOutlined />
                </Col>
                <Col span={6}>
                    <img src={banner.imageUrl}/>
                </Col>
                <Col className='space-y-2' span={16}>
                    <span>Link</span>
                    <Input placeholder={`${banner.contentUrl}`} width={200}/>
                    <Row gutter={[8, 8]}>
                        <Col span={19}/>
                        <Col span={5}>
                            <Button className="w-20 text-white text-base font-medium border rounded-xl hover:bg-white" style={{backgroundColor:"#006D38"}}>Lưu</Button>
                            <Button className="w-20 text-white text-base font-medium border rounded-xl hover:bg-white" style={{backgroundColor:"#CE1124"}}>Hủy</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    ) 
}

export default BannerCard