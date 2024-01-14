import { Table, Button, Col, Row, Typography, Divider } from 'antd'
import { useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { requestLoadCompany } from '../../../../redux/slices/companySlice'
import { PlusOutlined, EditFilled, DeleteFilled, PauseOutlined } from '@ant-design/icons';
import ModalCompany from '../components/ModalCompany'
import { setCurrentCompany } from '../../../../redux/slices/companySlice'
import './style.css'

const { Title } = Typography

export const Dashboard = () => {
    const dispatch = useAppDispatch()
    let listCompany = useAppSelector((state) => state.companyState.listCompany)
    let currentCompany = useAppSelector((state) => state.companyState.currentCompany)
    const [modalShow, setModalShow] = useState(false)
    async function handleLoadListCompany() {
        try {
            await dispatch(requestLoadCompany())
        } catch (err) {
            console.log(err)
        }
    }
    const customHeaderStyle = {
        background: '#006D38', // Set your custom color here
        color: 'white', // Set the text color if needed
        fontSize: 20,
        fontFamily: ['Quicksand', 'sans-serif']
        // textAlign: center
    };

    useEffect(() => {
        handleLoadListCompany()
    }, [modalShow])

    return (
        <div>
            <Row>
                <Col span={5}>
                <Title level={2}>Hãng xe</Title>
                </Col>
                <Col span={16}/>
                <Col span={3}>
                <Button 
                onClick={() => {
                    dispatch(setCurrentCompany(null))
                    setModalShow(true)
                }} 
                icon={<PlusOutlined />} 
                className="w-40 h-14 bg-green-700 hover:bg-white text-white text-base font-medium border rounded-xl mt-4">
                    Thêm hãng xe
                </Button>
                </Col>
                
            </Row>
            <Divider />
            <div className="space-y-4">
                <Table
                dataSource={listCompany}
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
                    <Table.Column title="Tên hãng xe" dataIndex="name" />
                    <Table.Column title="Số điện thoại" dataIndex="phoneNumber" />
                    <Table.Column title="" render={(_, item) => (
                        <div className='space-x-2'>
                            <Button className="edit-btn" onClick={() => {
                                dispatch(setCurrentCompany(item))
                                setModalShow(true)
                            }} icon={<EditFilled/>} />

                            <Button className="del-btn" onClick={() => {
                        
                            }} icon={<DeleteFilled />} />

                            <Button className='pause-btn' onClick={() => {
                                
                            }} icon={<PauseOutlined/>} />
                        </div>
                    )}/>
                </Table>
            </div>
            {
                modalShow && <ModalCompany currentCompany={currentCompany} setCurrentCompany={setCurrentCompany} modalShow={modalShow} setModalShow={setModalShow}/>
            }
        </div>
    )
}