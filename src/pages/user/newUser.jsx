import { Button, Input, Modal, notification } from "antd";
import { useContext, useState } from "react";
import { createUser } from "../../services/api.service";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { LoadUserContext } from "./user"
const NewUser = () => {
    const { loadUser } = useContext(LoadUserContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const resCreate = await createUser(fullName, email, password, phone);
        if (resCreate.data) {
            api.open({
                message: 'Create user successfully',
                icon: (
                    <CheckOutlined
                        style={{
                            color: '#00b894',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            loadUser();
        }
        else
            api.open({
                message: 'Create user failed',
                description: JSON.stringify(resCreate.message),
                icon: (
                    < CloseOutlined
                        style={{
                            color: '#d63031',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
        closeModal();
    };
    const handleCancel = () => {
        closeModal();
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }
    return (
        <>
            {contextHolder}
            <Button
                style={{ margin: 10 }}
                type="primary"
                onClick={showModal}>
                Create User
            </Button>
            <Modal title="Create User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: "flex", gap: '15px', flexDirection: 'column' }}>
                    <div>
                        <span>Full Name</span>
                        <Input
                            onChange={(event) => setFullName(event.target.value)}
                            value={fullName}
                        ></Input>
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        ></Input>
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        ></Input.Password>
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                        ></Input>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default NewUser;