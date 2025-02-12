import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

const UnAuthPage = () => {
    const navigate = useNavigate();
    const handleBtnLoginPage = () => {
        navigate("/login");
    }
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={handleBtnLoginPage}>Go to login page</Button>}
        />
    )
}
export default UnAuthPage