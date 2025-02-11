import { createContext, useState } from "react";
import { getAllBook } from "../../services/api.service";
import BookTable from "./bookTable";
import NewBook from "./newBook";

const LoadBookContext = createContext();
const Book = () => {
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
}
export { Book, LoadBookContext }