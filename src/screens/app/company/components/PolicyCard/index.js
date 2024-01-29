import { Card, Row, Typography, Col} from 'antd'
import { useState } from 'react'
import { DownOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { apiDelPolicy } from '../../../../../api/services';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { requestLoadPolicy } from '../../../../../redux/slices/companySlice';

const {Title} = Typography

const PolicyCard = ({policy}) => {
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState(false)
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const handleDelPolicy = async (id) => {
        const res = await apiDelPolicy({id: id})
       if(res.data.error == 0) {
        await dispatch(requestLoadPolicy(companyId))
       }
    }

    return (
        <>
            <div>
            <Card 
                title={<Title level={4}>{policy.name}</Title>} 
                extra={<Row className='space-x-3'>
                    <div><EditFilled /> Sửa</div>
                    <div onClick={() => handleDelPolicy(policy.id)}><DeleteFilled /> Xóa</div>
                </Row>}>
                    <Row>
                        <Col span={3}>
                            <Title level={4}>Nội dung</Title>
                            
                        </Col>
                        <Col span={18}/>
                        <Col span={3}>
                            <div>
                                {status ? 'Thu gọn' : 'Chi tiết'} <DownOutlined onClick={() => setStatus(!status)}/>
                            </div>
                        </Col>
                       
                    </Row>

                    { status ? <div>{policy.content}</div> : null}
                </Card>
            </div>
        </>
    )
}

export default PolicyCard