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
        }
      ];
    return (
        <div>
            <div className='flex-row items-center ml-4 grid grid-cols-12'>
                <div className="col-span-2 text-white font-extrabold text-base">
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {status === 'operating' ? "Điều hành" : "Quản lý"}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <div className="col-span-9">
                    {
                      status === 'operating' ? <div>
                          <Row className="bg-white rounded h-9 items-center">
                            <Col className="space-x-20">
                              <Link to="/" className="hover:text-green-600 text-base ml-2">Địa điểm</Link>
                              <Link to="/phuong-tien" className="hover:text-green-600 text-base">Phương tiện</Link>
                              <Link to="/chinh-sach" className="hover:text-green-600 text-base">Chính sách</Link>
                              <Link to="/lich-xuat-ben" className="hover:text-green-600 text-base">Lịch xuất bến</Link>
                            </Col>
                          </Row>  
                      </div>
                      : <Row className="bg-white rounded h-9 items-center">
                          <Col className="space-x-20">
                            <Link to="/nhan-vien" className="hover:text-green-600 text-base ml-20">Nhân viên</Link>
                            <Link to="/thong-tin" className="hover:text-green-600 text-base">Thông tin hãng xe</Link>
                            <Link to="/bao-cao" className="hover:text-green-600 text-base">Báo cáo</Link>
                          </Col>
                      </Row>

                    }
                </div>
                <div className="col-span-1 ml-10">
                    <AvatarDropdown />
                </div>
            </div>
        </div>
    )
}

export default AppNav