import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

const NoPage = () => {
    const navigate = useNavigate();
    const handleBtnHomePage = () => {
        navigate("/");
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleBtnHomePage}>Go to home page</Button>}
        />
    )
}
export default NoPage