import { LoadingOutlined } from '@ant-design/icons'

const LoadingPage = () => {
    return(
        <div style={{ width: "100%", height: "80vh", color: "#006D38", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LoadingOutlined style={{ fontSize: '64px' }} />
        </div>
    )
}

export default LoadingPage