import { Card, Popover, Button, Form, Col, Input, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { UploadImage } from '../../../../components/layouts/components/UpLoadImage'
import { useAppSelector, useAppDispatch } from '../../../../redux/hook'
import { requestCreateBanner, requestLoadSubBanner, requestLoadMainBanner } from '../../../../redux/slices/newsSlice'
import { apiCreateMediaContent, apiCreateNewsFeed, apiGetMediaContent } from '../../../../api/services'
import { useState, useEffect } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import ImgUpload from '../../../../components/layouts/components/ImgUpload'
import './style.css'
import BannerCard from '../components/BannerCard'

const { Title } = Typography
const { TextArea } = Input
export const News = () => {
    const [form] = Form.useForm()
    const [subShow, setSubShow] = useState(false)
    const [mainBanner, setMainBanner] = useState()
    const [newsImg, setNewsImg] = useState()
    const listMainBanner = useAppSelector((state) => state.newsState.mapMainBanner)
    const listSubBanner = useAppSelector((state) => state.newsState.mapSubBanner)
    const dispatch = useAppDispatch()
    const bannerExample = {
        "id": 4,
        "imageUrl": "https://i.ibb.co/g3wQPk2/Rectangle-3342.png",
        "contentUrl": "main-banner",
        "type": 0
    };
    useEffect(() => {
        dispatch(requestLoadMainBanner(0))
        dispatch(requestLoadSubBanner(1))
    }, [])
    
    const handleUploadMainBanner = (url) => {
        setMainBanner(url)
    }
    const handleUploadNewsImg = (url) => {
        setNewsImg(url)
    }
    const handleSubmitMainBanner = async () => {
        try {
            const data = {
                contentUrl: "main-banner",
                imageUrl: mainBanner,
                type: 0
            }
            dispatch(requestCreateBanner(data))
            setMainBanner(null)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateNews = async (data, url) => {
        const res = await apiCreateNewsFeed({...data, imageUrl: url})
        if(res.data.error == 0) {
            form.resetFields()
            setNewsImg(null)
            console.log("Success")   
        }
    }
    return (
        <div>
            <div className='my-4'>
                <Card title={<Title level={3} style={{fontFamily:'Quicksand', color:'#006D38', fontWeight:'bold'}}>BANNER CHÍNH</Title>}>
                    <div className='flex flex-row space-x-10'>
                        <div className='col-span-2'/>
                        <Card style={{backgroundColor:'#F3F3F3'}}>
                            <ImgUpload onImageUpload={handleUploadMainBanner} imageUrl={mainBanner} setImageUrl={setMainBanner}/>
                        </Card>
                        <Card style={{backgroundColor:'#F3F3F3'}}>
                            <img src={bannerExample.imageUrl}/>
                        </Card>
                        <Card style={{backgroundColor:'#F3F3F3'}}>
                            <img src={bannerExample.imageUrl}/>
                        </Card>
                    </div>
                    <div className='my-4 grid grid-cols-12'>
                        <div className='col-span-5'/>
                        <Button className="w-40 h-12 bg-green-700 text-white text-base font-medium border rounded-xl hover:bg-white col-span-2" onClick={handleSubmitMainBanner}>Đăng tải</Button>
                        <div className='col-span-5'/>
                    </div>
                    
                </Card>
            </div>
            <div className='my-4'>
                <Card title={<Title level={3} style={{fontFamily:'Quicksand', color:'#006D38', fontWeight:'bold'}}>BANNER PHỤ</Title>} className='text-green-700'>
                    <div>
                        <div>
                            <div>
                                <Button className="w-40 h-12 bg-green-700 text-white text-base font-medium border rounded-xl hover:bg-white mb-4" onClick={() => setSubShow(!subShow)}>Thêm banner phụ</Button>
                            </div>
                        </div>
                        <div>
                            {
                                subShow && <div className='space-y-4'>
                                <Card style={{backgroundColor:'#F3F3F3'}}>
                                    <Row gutter={[8, 8]}>
                                        <Col className='flex items-center justify-center mr-4'>
                                            <MenuOutlined />
                                        </Col>
                                        <Col span={6}>
                                            <ImgUpload />
                                        </Col>
                                        <Col className='space-y-2' span={16}>
                                            <span>Link</span>
                                            <Input placeholder='URL' width={200}/>
                                            <Row gutter={[8, 8]}>
                                                <Col span={19}/>
                                                <Col span={5}>
                                                    <Button className="w-20 text-white text-base font-medium border rounded-xl hover:bg-white" style={{backgroundColor:"#006D38"}}>Lưu</Button>
                                                    <Button className="w-20 text-white text-base font-medium border rounded-xl hover:bg-white" style={{backgroundColor:"#CE1124"}}>Hủy</Button>
                                                </Col>
                                            </Row>
                                            
                                        </Col>
                                    </Row>
                                </Card>
                                <Card style={{backgroundColor:'#F3F3F3'}}>
                                    <BannerCard banner={bannerExample}/>
                                </Card>

                                <Card style={{backgroundColor:'#F3F3F3'}}>
                                    <BannerCard banner={bannerExample}/>
                                </Card>
                                </div>
                            }
                        </div>
                        
                    </div>
                    
                </Card>
            </div>
            <div className='my-4'>
                <Card title={<Title level={3} style={{fontFamily:'Quicksand', color:'#006D38', fontWeight:'bold'}}>TIN TỨC</Title>} extra={<Link to="/news/all" style={{fontWeight:'bold'}}>Xem thêm</Link>}>
                    <div>
                        <Form
                            form={form}
                            onFinish={(data) => handleCreateNews(data, newsImg)}
                        >
                            <Row gutter={[8, 8]}>
                                <Col span={6}>
                                    <Form.Item>
                                        <ImgUpload onImageUpload={handleUploadNewsImg} imageUrl={newsImg} setImageUrl={setNewsImg}/>
                                    </Form.Item>
                                
                                </Col>

                                <Col span={18}>
                                    <b>Tiêu đề</b>
                                    <Form.Item name="title">
                                        <Input placeholder='Nhập tiêu đề' width={200}/>
                                    </Form.Item>
                                    <b>Nội dung</b>
                                    <Form.Item name="content">
                                        <TextArea placeholder='Nhập nội dung'/>
                                    </Form.Item>
                                </Col>
                            </Row>
                 
                            <Button htmlType='submit' className="w-40 h-12 bg-green-700 text-white text-base font-medium border rounded-xl hover:bg-white">Đăng tải</Button>
                        </Form>
                    </div>
                </Card>
            </div>
            
        </div>
    )
}