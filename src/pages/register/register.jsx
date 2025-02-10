import { CheckOutlined, CloseOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd"
import { useState } from "react";
import { registerUser } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form] = Form.useForm();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const handleLoginNow = () => {
        navigate('/login');
    }
    const handleRegisterFinish = async (values) => {
        setRegisterLoading(true);
        const resRegister = await registerUser(values.fullName, values.email, values.password, values.phone)
        if (resRegister.data) {
            api.open({
                message: 'Register account successfully',
                icon: (
                    <CheckOutlined
                        style={{
                            color: '#00b894',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            setTimeout(() => {
                setRegisterLoading(false);
                navigate('/login');
            }, 1000);
        }
        else {
            api.open({
                message: 'Register account failed',
                description: JSON.stringify(resRegister.message),
                icon: (
                    < CloseOutlined
                        style={{
                            color: '#d63031',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            setRegisterLoading(false);
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
                    name="register"
                    onFinish={handleRegisterFinish}
                >
                    <Form.Item
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Full name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Full name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
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
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone!',
                            },
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} placeholder="Phone" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={registerLoading}>
                            Register
                        </Button>
                        You already have an account <a onClick={handleLoginNow}>Login now!</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default Register