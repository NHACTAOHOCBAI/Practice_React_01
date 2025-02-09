import axios from "./axios.customize"
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
export {
    getAllUser, createUser, deleteUser, updateUser, updateUserAvatar,
    uploadSingleFile
}