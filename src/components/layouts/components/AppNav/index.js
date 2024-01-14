import { Dropdown, Space, Row, Col, Button } from "antd"
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import AvatarDropdown from "../AvatarDropdown";
import './style.css'
const AppNav = () => {
    const [status, setStatus] = useState("operating")
    const navigate = useNavigate()
    const items = [
        {
          key: '1',
          label: (
            <a onClick={() => {
              setStatus("operating")
              navigate("/")
              }} className="text-xl font-quicksand">
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
              }} className="text-xl font-quicksand">
              Quản lý
            </a>
          )
        }
      ];
    return (
        <div>
            <div className='flex flex-row items-center justify-center ml-4'>
                <div className="text-white font-extrabold text-xl">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {status === 'operating' ? "Điều hành" : "Quản lý"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <div>
                    {
                      status === 'operating' ? <div>
                          <Row className="bg-white mx-4 space-x-16 rounded-lg font-medium">
                            <Col span={1}/>
                            <Col span={20} className="space-x-16">
                              <Link to="/" className="hover:text-green-600 text-xl">Địa điểm</Link>
                              <Link to="/phuong-tien" className="hover:text-green-600 text-xl">Phương tiện</Link>
                              <Link to="/chinh-sach" className="hover:text-green-600 text-xl">Chính sách</Link>
                              <Link to="/lich-xuat-ben" className="hover:text-green-600 text-xl">Lịch xuất bến</Link>
                            </Col>

                            <Col span={2}/>
                          </Row>  
                      </div>
                      : <Row className="bg-white mx-4 space-x-16 rounded-lg font-bold">
                          <Col span={1}/>
                          <Col span={20} className="space-x-16">
                            <Link to="/nhan-vien" className="hover:text-green-600 text-xl">Nhân viên</Link>
                            <Link to="/thong-tin" className="hover:text-green-600 text-xl">Thông tin hãng xe</Link>
                            <Link to="/bao-cao" className="hover:text-green-600 text-xl">Báo cáo</Link>
                          </Col>
                          
                          <Col span={2}/>
                      </Row>

                    }
                </div>
                <div className="ml-10">
                    <AvatarDropdown />
                </div>
                <div className="ml-10"/>
            </div>
        </div>
    )
}

export default AppNav