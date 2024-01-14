import { Card } from 'antd'
import './style.css'

const NewsCard = ({news}) => {
    return (
        <>
            <Card>
                <img src={news.imageUrl}/>
                <h1>{news.title}</h1>
                <h2>{news.content}</h2>
            </Card>
        </>
    )
}

export default NewsCard