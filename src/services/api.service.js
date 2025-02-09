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
export {
    getAllUser, createUser, deleteUser
}