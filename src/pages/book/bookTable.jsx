/* eslint-disable react/prop-types */
import BookDetail from "./bookDetail";
import BookUpdate from "./bookUpdate";
import { LoadBookContext } from "./book";
import { useContext, useEffect, useState } from "react";
import { deleteBook } from "../../services/api.service";
import { notification, Popconfirm, Space, Table } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const BookTable = (props) => {
    const { bookData, current, setCurrent, pageSize, setPageSize, total, setTotal, loadingTable } = props;
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [updatedBook, setUpdatedBook] = useState("");
    const [detailBook, setDetailBook] = useState("");
    const { loadBook } = useContext(LoadBookContext);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        loadBook();
    }, [current, pageSize, total]);
    const handleEditBook = (record) => {
        setUpdatedBook(record);
        setIsUpdateModalOpen(true);
    }
    const handleDetailBook = (record) => {
        setDetailBook(record);
        setIsDetailOpen(true);
    }
    const handleDelete = async (id) => {
        const resDelete = await deleteBook(id);
        if (resDelete.data) {
            api.open({
                message: 'Delete book successfully',
                icon: (
                    <CheckOutlined
                        style={{
                            color: '#00b894',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            loadBook();
        }
        else
            api.open({
                message: 'delete book failed',
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
                    <div onClick={() => handleDetailBook(record)}>{record._id}</div>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <EditOutlined
                            onClick={() => handleEditBook(record)}
                            style={{ color: "#0984e3" }}
                        />
                        <Popconfirm
                            title="Delete the book"
                            description="Are you sure to delete this book?"
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
            <BookDetail
                setIsDetailOpen={setIsDetailOpen}
                isDetailOpen={isDetailOpen}
                detailBook={detailBook}
            />
            <BookUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                updatedBook={updatedBook}
                setUpdatedBook={setUpdatedBook}
            />
            <Table
                columns={columns}
                dataSource={bookData}
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
export default BookTable;
