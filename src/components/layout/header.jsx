import { CheckOutlined, CloseOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MehOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, notification } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserInformationContext } from "../../App";
import { logoutUser } from "../../services/api.service";

const Header = () => {
    const { userInformation, setUserInformation } = useContext(UserInformationContext);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const resLogout = await logoutUser();
        if (resLogout.data) {
            api.open({
                message: 'Logout account successfully',
                icon: (
                    <CheckOutlined
                        style={{
                            color: '#00b894',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            setUserInformation("");
            localStorage.removeItem("access_token");
            navigate('/');
        }
        else {
            api.open({
                message: 'Logout account failed',
                description: JSON.stringify(resLogout.message),
                icon: (
                    < CloseOutlined
                        style={{
                            color: '#d63031',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
        }
    }
    const items = [
        {
            label: <Link to={'/'}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={'/users'}>User</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={'/books'}>Book</Link>,
            key: 'books',
            icon: <SnippetsOutlined />,
        },
        ...(userInformation ?
            [{
                label: `Hi ${userInformation} !!!`,
                key: 'Hi',
                icon: <MehOutlined />,
                children: [
                    {
                        label: <span onClick={handleLogout}> Log out</span>,
                        key: 'logout',
                        icon: <LogoutOutlined />
                    }
                ]
            }]
            :
            [{
                label: <Link to={'/login'}>Login</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            }]
        )
    ];
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <>
            {contextHolder}
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items} />
        </>
    )
}
export default Header