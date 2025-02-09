/* eslint-disable react/prop-types */
import { Button, Drawer, notification } from "antd";
import { useContext, useState } from "react";
import { updateUserAvatar, uploadSingleFile } from "../../services/api.service";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { LoadUserContext } from "./user";

const UserDetail = (props) => {
    const { loadUser } = useContext(LoadUserContext)
    const { isDetailOpen, setIsDetailOpen, detailUser } = props;
    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const onClose = () => {
        closeDrawer();
    }
    const closeDrawer = () => {
        setIsDetailOpen(false);
        setSelectedFile("");
        setPreview("");
    }
    const handleOnChangeFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }
    const handleSave = async () => {
        const resUploadFile = await uploadSingleFile(selectedFile, "avatar");
        if (resUploadFile.data) {
            const resUpdateAvatar = await updateUserAvatar(detailUser._id, detailUser.fullName, detailUser.phone, resUploadFile.data.fileUploaded)
            if (resUpdateAvatar.data) {
                api.open({
                    message: 'Update avatar successfully',
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
            else {
                api.open({
                    message: 'Update avatar failed',
                    description: JSON.stringify(resUpdateAvatar.message),
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
            closeDrawer();
        }
        else {
            api.open({
                message: 'Upload file failed',
                description: JSON.stringify(resUploadFile.message),
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
    return (
        <>
            {contextHolder}
            <Drawer title="User Information" open={isDetailOpen} onClose={onClose} >
                <p>{`ID : ${detailUser._id}`}</p>
                <p>{`Full Name : ${detailUser.fullName}`}</p>
                <p>{`Email : ${detailUser.email}`}</p>
                <p>{`Phone : ${detailUser.phone}`}</p>
                <p>{`Role : ${detailUser.role}`}</p>
                <div>
                    <p>Avatar :</p>
                    <img
                        style={{ margin: 10 }}
                        height={100}
                        width={100}
                        src={`http://localhost:8080/images/avatar/${detailUser.avatar}`}
                    />
                    <input
                        type='file'
                        onChange={handleOnChangeFile}
                    ></input>
                    {
                        preview && (
                            <>
                                <img
                                    style={{ margin: 10 }}
                                    height={100}
                                    width={100}
                                    src={preview}
                                />
                                <br />
                                <Button
                                    type='primary'
                                    onClick={handleSave}
                                >Save</Button>
                            </>
                        )
                    }
                </div>
            </Drawer>
        </>
    )
}
export default UserDetail;