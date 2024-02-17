import { Table, Button, Col, Row, Typography, Divider } from 'antd'
import { useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { requestLoadStaff, setCurrentStaff } from '../../../../redux/slices/staffSlice'
import { PlusOutlined, EditFilled, DeleteFilled, PauseOutlined } from '@ant-design/icons';
import ModalStaff from '../components/ModalStaff';
import { StaffRole } from './logic';
import { apiDelStaff } from '../../../../api/services';
import LoadingPage from '../../../../utils/Loading';
const { Title } = Typography

const Staff = () => {
    const dispatch = useAppDispatch()
    const companyId = useAppSelector(state => state.authState.userInfo.id)
    const currentStaff = useAppSelector(state => state.staffState.currentStaff)
    const listStaff = useAppSelector(state => state.staffState.listStaff)
    const isLoading = useAppSelector(state => state.staffState.loading)
    const [modalShow, setModalShow] = useState(false)
    const customHeaderStyle = {
        background: '#006D38', // Set your custom color here
        color: 'white', // Set the text color if needed
        fontSize: 20,
        fontFamily: ['Quicksand', 'sans-serif']
        // textAlign: center
    };

    async function handleLoadStaff() {
        dispatch(requestLoadStaff(companyId))
    }
    async function handleDelStaff(id) {
        const res = await apiDelStaff({id: id})
        if(!res.error) {
            dispatch(requestLoadStaff(companyId))
        }
    }

    useEffect(() => {
        handleLoadStaff()
    },[])

    return (
        <>
        {
            isLoading ? <LoadingPage /> :  <div className='mx-16'>
            <Row>
                <Col span={5}>
                <Title level={3}>Nhân viên</Title>
                </Col>
                <Col span={15}/>
                <Col span={4}>
                <Button 
                onClick={() => {
                    setModalShow(true)
                    dispatch(setCurrentStaff(null))
                }} 
                icon={<PlusOutlined />} 
                className="h-10 text-white font-medium border rounded-md">
                    Thêm nhân viên
                </Button>
                </Col>
                
            </Row>
            <Divider />
            <div className="space-y-4">
                <Table
                dataSource={listStaff}
                components={{
                    header: {
                      cell: (props) => <th style={customHeaderStyle}>{props.children}</th>,
                    },
                  }}
                  style={{
                    fontFamily: ['Quicksand', 'sans-serif']
                  }}
                >
                    <Table.Column title="STT" render={(_, __, index) => index + 1}/>
                    <Table.Column title="Họ tên" dataIndex="name" />
                    <Table.Column title="Email" dataIndex="email" />
                    <Table.Column title="Số điện thoại" dataIndex="phoneNumber" />
                    <Table.Column title="Phân quyền" render={(_, item) => (<div>
                        {
                            item.roleList.map(role => <p>{StaffRole[role].label}</p>)
                        }
                    </div>)} />
                    <Table.Column title="" render={(_, item) => (
                        <div className='space-x-2'>
                            <Button className="edit-btn" onClick={() => {
                                dispatch(setCurrentStaff(item))
                                setModalShow(true)
                            }} icon={<EditFilled/>} />
    
                            <Button className="del-btn" onClick={() => {
                                handleDelStaff(item.id)
                            }} icon={<DeleteFilled />} />
    
                            <Button className='pause-btn' onClick={() => {
                                
                            }} icon={<PauseOutlined/>} />
                        </div>
                    )}/>
                </Table>
            </div>
            {
                modalShow && <ModalStaff currentStaff={currentStaff} setCurrentStaff={setCurrentStaff} modalShow={modalShow} setModalShow={setModalShow}/>
            }
            </div>
        }
        </>
       
    )
}

export default Staff