import { Card, Row, Typography, Popconfirm} from 'antd'
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
    const okButtonProps = {
        className: 'text-green-700'
    }

    return (
        <>
            <div>
            <Card 
                title={<Title level={4}>{policy?.name}</Title>} 
                extra={<Row className='space-x-3'>
                    <a className='text-green-700'><EditFilled /> Sửa</a>
                    <Popconfirm title={<p className='text-green-700 font-bold'>Bạn muốn xóa chính sách này?</p>}
                            okText="Có"
                            cancelText="Không"
                            okButtonProps={okButtonProps}
                            onConfirm={() => handleDelPolicy(policy.id)}
                            >
                            <a className="text-red-700" ><DeleteFilled /> Xóa</a>
                            </Popconfirm>
                </Row>}>
                <div className="content-wrapper">
                    <p className={`limited-height ${!status ? 'expanded' : ''}`}>
                        {policy?.content}
                    </p>
                    {status && (
                        <a className="read-more-btn" onClick={() => setStatus(!status)}>
                            Xem thêm
                        </a>
            )}
        </div>
                </Card>
            </div>
        </>
    )
}

export default PolicyCard