/* eslint-disable react/prop-types */
import { Input, InputNumber, Modal, notification, Select } from "antd";
import { LoadBookContext } from "./book";
import { useContext, useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { updateBook, uploadSingleFile } from "../../services/api.service";

const BookUpdate = (props) => {
    const { loadBook } = useContext(LoadBookContext)
    const { isUpdateModalOpen, setIsUpdateModalOpen, updatedBook, setUpdatedBook } = props;
    const [mainText, setMainText] = useState();
    const [author, setAuthor] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");
    const [isDoneUpdate, setIsDoneUpdate] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        setMainText(updatedBook.mainText);
        setAuthor(updatedBook.author);
        setPrice(updatedBook.price);
        setQuantity(updatedBook.quantity);
        setCategory(updatedBook.category);
        setSelectedFile(updatedBook.thumbnail);
        setPreview(`http://localhost:8080/images/book/${updatedBook.thumbnail}`);
    }, [updatedBook])
    const handleOnChangeFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }
    const handleOk = async () => {
        setIsDoneUpdate(true);
        if (!selectedFile) {
            api.open({
                message: 'Update book failed',
                description: "You need to upload a image of the book",
                icon: (
                    < CloseOutlined
                        style={{
                            color: '#d63031',
                        }} />
                ),
                showProgress: true,
                pauseOnHover: false,
            });
            return;
        }
        const resUploadFile = await uploadSingleFile(selectedFile, "book");
        if (resUploadFile.data) {
            const resUpdate = await updateBook(updatedBook._id, resUploadFile.data.fileUploaded, mainText, author, price, quantity, category);
            if (resUpdate.data) {
                api.open({
                    message: 'Update book successfully',
                    icon: (
                        <CheckOutlined
                            style={{
                                color: '#00b894',
                            }} />
                    ),
                    showProgress: true,
                    pauseOnHover: false,
                });
                await loadBook();
            }
            else
                api.open({
                    message: 'Update book failed',
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
        setIsDoneUpdate(false);
        closeModal();
    };
    const handleCancel = () => {
        closeModal();
    }
    const closeModal = () => {
        setIsUpdateModalOpen(false);
        setUpdatedBook("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile("");
        setPreview("");
    }
    return (
        <>
            {contextHolder}
            <Modal title="Update Book" open={isUpdateModalOpen} confirmLoading={isDoneUpdate} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: "flex", gap: '15px', flexDirection: 'column' }}>
                    <div>
                        <span>ID</span>
                        <Input
                            disabled
                            value={updatedBook._id}
                        ></Input>
                    </div>
                    <div>
                        <span>Main text</span>
                        <Input
                            onChange={(event) => setMainText(event.target.value)}
                            value={mainText}
                        />
                    </div>
                    <div>
                        <span>Author</span>
                        <Input
                            onChange={(event) => setAuthor(event.target.value)}
                            value={author}
                        />
                    </div>
                    <div>
                        <span style={{ display: "block" }}>Price</span>
                        <InputNumber
                            addonAfter="VNĐ"
                            onChange={(event) => setPrice(event)}
                            value={price}
                        />
                    </div>
                    <div>
                        <span style={{ display: "block" }}>Quantity</span>
                        <InputNumber
                            onChange={(event) => setQuantity(event)}
                            value={quantity}
                        />
                    </div>
                    <div>
                        <span style={{ display: "block" }}>Category</span>
                        <Select
                            style={{ width: 120 }}
                            onChange={(event) => setCategory(event)}
                            value={category}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' }]}
                        />
                    </div>
                    <div>
                        <input
                            type='file'
                            onChange={handleOnChangeFile}
                        ></input>
                        <br />
                        {
                            preview && (
                                <img
                                    style={{ margin: 10 }}
                                    height={100}
                                    width={100}
                                    src={preview}
                                />
                            )
                        }
                    </div>
                </div>
            </Modal></>)
}
export default BookUpdate