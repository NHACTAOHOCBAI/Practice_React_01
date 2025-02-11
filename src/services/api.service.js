import axios from "./axios.customize"
// User API 
const getAllUser = (current, pageSize) => {
    const URL = `v1/user?current=${current}&pageSize=${pageSize}`
    return axios.get(URL);
}
const createUser = (fullName, email, password, phone) => {
    const URL = `v1/user`
    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL, data);
}
const deleteUser = (_id) => {
    const URL = `v1/user/${_id}`;
    return axios.delete(URL);
}
const updateUser = (_id, fullName, phone) => {
    const URL = `v1/user`;
    const data = {
        _id,
        fullName,
        phone
    }
    return axios.put(URL, data);
}
// chua tim hieu uploadSingleFile
const updateUserAvatar = (_id, fullName, phone, avatar) => {
    const URL = `v1/user`;
    const data = {
        _id,
        fullName,
        phone,
        avatar
    }
    return axios.put(URL, data);
}
// User API
const uploadSingleFile = (file, folder) => {
    const URL = `v1/file/upload`;
    const config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);
    return axios.post(URL, bodyFormData, config);
}
const loginUser = (username, password) => {
    const URL = `v1/auth/login`;
    const data = {
        username,
        password
    }
    return axios.post(URL, data);
}
const registerUser = (fullName, email, password, phone) => {
    const URL = `v1/user/register`;
    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL, data);
}
const logoutUser = () => {
    const URL = `v1/auth/logout`;
    return axios.post(URL);
}
const getAccount = () => {
    const URL = `v1/auth/account`;
    return axios.get(URL);
}
//Book API
const getAllBook = (current, pageSize) => {
    const URL = `v1/book?current=${current}&pageSize=${pageSize}`
    return axios.get(URL);
}
const deleteBook = (_id) => {
    const URL = `v1/book/${_id}`;
    return axios.delete(URL);
}
const createBook = (thumbnail, mainText, author, price, quantity, category) => {
    const URL = `v1/book`;
    const data = {
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.post(URL, data);
}
//Book API
export {
    getAllUser, createUser, deleteUser, updateUser, updateUserAvatar,
    uploadSingleFile,
    loginUser, registerUser, logoutUser, getAccount,
    getAllBook, createBook, deleteBook
}