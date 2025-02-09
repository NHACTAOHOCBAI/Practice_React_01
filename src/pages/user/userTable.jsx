/* eslint-disable react/prop-types */
import { notification, Popconfirm, Space, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LoadUserContext } from "./user"
import { deleteUser } from "../../services/api.service";
import UserUpdate from "./userUpdate";
import UserDetail from "./userDetail";
const UserTable = (props) => {
    const { userData, current, setCurrent, pageSize, setPageSize, total, setTotal, loadingTable } = props;
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState("");
    const [detailUser, setDetailUser] = useState("");
    const { loadUser } = useContext(LoadUserContext);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        loadUser();
    }, [current, pageSize, total]);
    const handleEditUser = (record) => {
        setUpdatedUser(record);
        setIsUpdateModalOpen(true);
    }
    const handleDetailUser = (record) => {
        setDetailUser(record);
        setIsDetailOpen(true);
    }
    const handleDelete = async (id) => {
        const resDelete = await deleteUser(id);
        if (resDelete.data) {
            api.open({
                message: 'Delete user successfully',
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
                message: 'delete user failed',
                description: JSON.stringify(resDelete.message),
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
    const onChange = (values) => {
        setCurrent(values.current);
        setPageSize(values.pageSize);
        setTotal(values.total);
    }
    const columns = [
        {
            title: 'STT',
            key: 'STT',
            render: (_, __, index) => {
                return (
                    <div>{pageSize * (current - 1) + index + 1}</div>
                )
            }
        },
        {
            title: 'ID',
            key: 'ID',
            render: (record) => {
                return (
                    <div onClick={() => handleDetailUser(record)}>{record._id}</div>
                )
            }
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <EditOutlined
                            onClick={() => handleEditUser(record)}
                            style={{ color: "#0984e3" }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => { handleDelete(record._id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined
                                style={{ color: "#d63031" }}
                            />
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];
    return (
        <>
            {contextHolder}
            <UserDetail
                setIsDetailOpen={setIsDetailOpen}
                isDetailOpen={isDetailOpen}
                detailUser={detailUser}
                setDetailUser={setDetailUser}
            />
            <UserUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                updatedUser={updatedUser}
                setUpdatedUser={setUpdatedUser}
            />
            <Table
                columns={columns}
                dataSource={userData}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {
                            return (
                                <div> {range[0]}-{range[1]} trên {total} rows</div>
                            )
                        }
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />
        </>
    )
}
export default UserTable;