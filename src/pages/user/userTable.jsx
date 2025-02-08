/* eslint-disable react/prop-types */
import { Space, Table } from "antd";
import { useContext, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LoadUserContext } from "./user"
const UserTable = (props) => {
    const { userData, current, setCurrent, pageSize, setPageSize, total, setTotal, loadingTable } = props
    const { loadUser } = useContext(LoadUserContext)
    useEffect(() => {
        loadUser();
    }, [current, pageSize, total]);

    const onChange = (values) => {
        setCurrent(values.current);
        setPageSize(values.pageSize);
        setTotal(values.total);
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
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
            render: () => (
                <Space size="middle">
                    <EditOutlined style={{ color: "#0984e3" }} />
                    <DeleteOutlined style={{ color: "#d63031" }} />
                </Space>
            ),
        },
    ];
    return (
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
    )
}
export default UserTable;