import { HomeOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
    ];
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}
export default Header