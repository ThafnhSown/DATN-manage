import { useEffect, useState } from "react"
import { LoadingOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import NewsCard from "../NewsCard";
import { apiGetListNews } from "../../../../../api/services";

const { Title } = Typography 

export const ListNews = () => {
    const [listNews, setListNews] = useState([])

    async function handleLoadNews() {
        try{
            const res = await apiGetListNews()
            setListNews(res.data.data.content)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleLoadNews()
    }, [])

    return (
        <>
            <div>
                <Title level={3} style={{fontFamily:"Quicksand"}}>TIN TỨC ĐÃ ĐĂNG</Title>
                <div className="grid grid-cols-4 gap-8">
                {
                    listNews.length ? (
                        listNews.map(news => (
                            <NewsCard news={news}/>
                        ))
                    ) : <LoadingOutlined />
                }
                </div>
                
            </div>
        </>
    )
}