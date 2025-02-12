/* eslint-disable react/prop-types */
import { Drawer } from "antd";

const BookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, detailBook } = props;
    const onClose = () => {
        closeDrawer();
    }
    const closeDrawer = () => {
        setIsDetailOpen(false);
    }
    return (
        <>
            <Drawer title="Book Information" open={isDetailOpen} onClose={onClose} >
                <p>{`ID : ${detailBook._id}`}</p>
                <p>{`Main text : ${detailBook.mainText}`}</p>
                <p>{`Author : ${detailBook.author}`}</p>
                <p>{`Price : ${detailBook.price}`}</p>
                <p>{`Sold : ${detailBook.sold}`}</p>
                <p>{`Quantity : ${detailBook.quantity}`}</p>
                <p>{`Category : ${detailBook.category}`}</p>
                <div>
                    <p>Image :</p>
                    <img
                        style={{ margin: 10 }}
                        height={100}
                        width={100}
                        src={`http://localhost:8080/images/book/${detailBook.thumbnail}`}
                    />
                </div>
            </Drawer>
        </>
    )
}
export default BookDetail;