import { CheckOutlined, CloseOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { loginUser } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserInformationContext } from "../../App";

const Login = () => {
    const { setUserInformation } = useContext(UserInformationContext);
    const [form] = Form.useForm();
    const [loginLoading, setLoginLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const handleRegisterNow = () => {
        navigate('/register');
    }
    const handleLoginFinish = async (values) => {
        setLoginLoading(true);
        const resLogin = await loginUser(values.username, values.password);
        if (resLogin.data) {
            localStorage.setItem("access_token", resLogin.data.access_token);
            api.open({
                message: 'Login account successfully',
                icon: (
                    <CheckOutlined
                        style={{
                            color: '#00b894',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            setUserInformation(resLogin.data.user.fullName)
            setTimeout(() => {
                setLoginLoading(false);
                navigate('/');
            }, 1000);
        }
        else {
            api.open({
                message: 'Login account failed',
                description: JSON.stringify(resLogin.message),
                icon: (
                    < CloseOutlined
                        style={{
                            color: '#d63031',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            setLoginLoading(false);
        }
    }
    return (
        <>
            {contextHolder}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Form
                    form={form}
                    name="login"
                    onFinish={handleLoginFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={loginLoading}>
                            Log in
                        </Button>
                        or <a onClick={handleRegisterNow}>Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default Login;