import { CheckOutlined, CloseOutlined, HomeOutlined, LoadingOutlined, LoginOutlined, LogoutOutlined, MehOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, notification, Spin } from "antd";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserInformationContext } from "../../App";
import { logoutUser } from "../../services/api.service";

const Header = () => {
    const { userInformation, setUserInformation, isAppLoading, setIsAppLoading } = useContext(UserInformationContext);
    let location = useLocation();
    console.log(location);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const handleLogout = async () => {
        setIsAppLoading(true);
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
        setIsAppLoading(false);
    }
    const items = [
        {
            label: <Link to={'/'}>Home</Link>,
            key: "/",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={'/users'}>User</Link>,
            key: '/users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={'/books'}>Book</Link>,
            key: '/books',
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
                key: '/login',
                icon: <LoginOutlined />,
            }]
        )
    ];
    return (
        <>
            {
                isAppLoading == true ?
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                            width: "100vw",
                        }}
                    >
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                    </div>
                    :
                    <>
                        {contextHolder}
                        <Menu
                            selectedKeys={location.pathname}
                            mode="horizontal"
                            items={items} />
                    </>
            }
        </>
    )
}
export default Header