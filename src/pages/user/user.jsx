import { createContext, useState } from "react"
import NewUser from "./newUser"
import UserTable from "./userTable"
import { getAllUser } from "../../services/api.service";
const LoadUserContext = createContext();
const User = () => {
    const [userData, setUserData] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const loadUser = async () => {
        setLoadingTable(true);
        const resLoad = await getAllUser(current, pageSize);
        if (resLoad.data) {
            setUserData(resLoad.data.result);
            setCurrent(resLoad.data.meta.current);
            setPageSize(resLoad.data.meta.pageSize);
            setTotal(resLoad.data.meta.total);
        }
        setLoadingTable(false);
    }
    return (
        <LoadUserContext.Provider value={{ loadUser }}>
            <NewUser />
            <UserTable
                userData={userData}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                setTotal={setTotal}
                loadingTable={loadingTable}
            />
        </LoadUserContext.Provider>
    )
}
export { User, LoadUserContext }