import { useContext, useState } from "react";
import { LoadBookContext } from "./book";
import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { createBook, uploadSingleFile } from "../../services/api.service";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const NewBook = () => {
    const { loadBook } = useContext(LoadBookContext)
    const [isModalOpen, setIsModalOpen] = useState(false); 4
    const [mainText, setMainText] = useState();
    const [author, setAuthor] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [isDoneCreate, setIsDoneCreate] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const handleOnChangeFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setIsDoneCreate(true);
        if (!selectedFile) {
            api.open({
                message: 'Create book failed',
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
            const resCreate = await createBook(resUploadFile.data.fileUploaded, mainText, author, price, quantity, category);
            if (resCreate.data) {
                api.open({
                    message: 'Create book successfully',
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
                    message: 'Create book failed',
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
        setIsDoneCreate(false);
        closeModal();
    };
    const handleCancel = () => {
        closeModal();
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFile("");
        setPreview("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
    }
    return (
        <>
            {contextHolder}
            <Button
                style={{ margin: 10 }}
                type="primary"
                onClick={showModal}>
                Create book
            </Button>
            <Modal title="Create Book" open={isModalOpen} onOk={handleOk} confirmLoading={isDoneCreate} onCancel={handleCancel}>
                <div style={{ display: "flex", gap: '15px', flexDirection: 'column' }}>
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
            </Modal>
        </>
    )
}
export default NewBook