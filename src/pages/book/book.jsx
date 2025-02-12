import { createContext, useContext, useState } from "react";
import { getAllBook } from "../../services/api.service";
import BookTable from "./bookTable";
import NewBook from "./newBook";
import { UserInformationContext } from "../../App";
import UnAuthPage from "../error/unauthorizePage";

const LoadBookContext = createContext();
const Book = () => {
    // xac minh nguoi dung
    const { userInformation } = useContext(UserInformationContext);
    //
    const [bookData, setBookData] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);
    const loadBook = async () => {
        setLoadingTable(true);
        const resLoad = await getAllBook(current, pageSize);
        if (resLoad.data) {
            setBookData(resLoad.data.result);
            setCurrent(resLoad.data.meta.current);
            setPageSize(resLoad.data.meta.pageSize);
            setTotal(resLoad.data.meta.total);
        }
        setLoadingTable(false);
    }
    return (
        (
            userInformation ?
                (
                    <LoadBookContext.Provider value={{ loadBook }}>
                        <NewBook />
                        <BookTable
                            bookData={bookData}
                            current={current}
                            setCurrent={setCurrent}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            total={total}
                            setTotal={setTotal}
                            loadingTable={loadingTable}
                        />
                    </LoadBookContext.Provider>
                )
                :
                (
                    <UnAuthPage />
                )
        )
    )
}
export { Book, LoadBookContext }