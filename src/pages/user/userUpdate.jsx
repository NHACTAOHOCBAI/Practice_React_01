/* eslint-disable react/prop-types */
import { Input, Modal, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { LoadUserContext } from "./user";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { updateUser } from "../../services/api.service";

const UserUpdate = (props) => {
    const { loadUser } = useContext(LoadUserContext)
    const { isUpdateModalOpen, setIsUpdateModalOpen, updatedUser, setUpdatedUser } = props;
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [isDoneUpdate, setIsDoneUpdate] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        setFullName(updatedUser.fullName)
        setPhone(updatedUser.phone)
    }, [updatedUser])
    const handleOk = async () => {
        setIsDoneUpdate(true);
        const resUpdate = await updateUser(updatedUser._id, fullName, phone);
        if (resUpdate.data) {
            api.open({
                message: 'Update user successfully',
                icon: (
                    <CheckOutlined
                        style={{
                            color: '#00b894',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            await loadUser();
        }
        else
            api.open({
                message: 'Update user failed',
                description: JSON.stringify(resUpdate.message),
                icon: (
                    < CloseOutlined
                        style={{
                            color: '#d63031',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
        setIsDoneUpdate(false);
        closeModal();
    }
    const handleCancel = () => {
        closeModal();
    }
    const closeModal = () => {
        setIsUpdateModalOpen(false);
        setUpdatedUser("");
        setFullName("");
        setPhone("");
    }
    return (
        <>
            {contextHolder}
            <Modal title="Create User" open={isUpdateModalOpen} confirmLoading={isDoneUpdate} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: "flex", gap: '15px', flexDirection: 'column' }}>
                    <div>
                        <span>ID</span>
                        <Input
                            disabled
                            value={updatedUser._id}
                        ></Input>
                    </div>
                    <div>
                        <span>Full Name</span>
                        <Input
                            onChange={(event) => setFullName(event.target.value)}
                            value={fullName}
                        ></Input>
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                        ></Input>
                    </div>
                </div>
            </Modal></>
    )
}
export default UserUpdate;