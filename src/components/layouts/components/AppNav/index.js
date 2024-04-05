import { Dropdown, Space, Row, Col, Button } from "antd"
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import AvatarDropdown from "../AvatarDropdown";
import './style.css'
const AppNav = () => {
    const [status, setStatus] = useState("operating")
    const navigate = useNavigate()
    const location = useLocation()
    const pathName = location.pathname
    useEffect(() => {
      if(pathName == '/nhan-vien' | pathName == '/bao-cao' | pathName == '/thong-tin' | pathName == '/booking') {
        setStatus("manage")
      }
      if(pathName == '/booking') {
        setStatus('ticket')
      }
    },[])
    const items = [
        {
          key: '1',
          label: (
            <a onClick={() => {
              setStatus("operating")
              navigate("/")
              }} className="text-sm font-quicksand">
              Điều hành
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={() => {
              setStatus("manage")
              navigate("/thong-tin")
              }} className="text-sm font-quicksand">
              Quản lý
            </a>
          )
        },
        {
          key: '3',
          label: (
            <a onClick={() => {
              setStatus('ticket')
              navigate("/booking")
              }} className="text-sm font-quicksand">
              Bán vé
            </a>
          )
        }
      ];
    return (
            <div className='flex-row items-center justify-center ml-4 grid grid-cols-12'>
                <div className="col-span-2 text-white font-extrabold text-base">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {status === 'operating' ? "Điều hành" : status == "ticket" ? "Bán vé" : "Quản lý"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <div className="col-span-9">
                    {
                      status === 'operating' ? 
                          <Row className="bg-white rounded h-9 items-center">
                            <Col className="space-x-20">
                              <Link to="/" className={`${pathName == '/' ? 'text-green-700' : null} hover:text-green-600 text-base ml-2`}>Địa điểm</Link>
                              <Link to="/phuong-tien" className={`${pathName == '/phuong-tien' ? 'text-green-700' : null} hover:text-green-600 text-base`}>Phương tiện</Link>
                              <Link to="/chinh-sach" className={`${pathName == '/chinh-sach' ? 'text-green-700' : null} hover:text-green-600 text-base`}>Chính sách</Link>
                              <Link to="/lich-xuat-ben" className={`${pathName == '/lich-xuat-ben' ? 'text-green-700' : null} hover:text-green-600 text-base`}>Lịch xuất bến</Link>
                            </Col>
                          </Row>  
                      : status === 'manage' ? <Row className="bg-white rounded h-9 items-center">
                          <Col className="space-x-20">
                            <Link to="/nhan-vien" className={`${pathName == '/nhan-vien' ? 'text-green-700' : null} hover:text-green-600 text-base ml-20`}>Nhân viên</Link>
                            <Link to="/thong-tin" className={`${pathName == '/thong-tin' ? 'text-green-700' : null} hover:text-green-600 text-base`}>Thông tin hãng xe</Link>
                            <Link to="/bao-cao" className={`${pathName == '/bao-cao' ? 'text-green-700' : null} hover:text-green-600 text-base`}>Báo cáo</Link>
                          </Col>
                      </Row> : <Row className="bg-white rounded h-9 items-center">
                          <Col className="space-x-20">
                            <Link to="/booking" className={`${pathName == '/booking' ? 'text-green-700' : null} hover:text-green-600 text-base ml-10`}>Booking</Link>
                          </Col>
                      </Row>

                    }
                </div>
                <div className="col-span-1 ml-10">
                    <AvatarDropdown />
                </div>
            </div>
    )
}

export default AppNav