/* eslint-disable react/prop-types */
import { Drawer } from "antd";

const UserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, detailUser, setDetailUser } = props;
    const onClose = () => {
        closeDrawer();
    }
    const closeDrawer = () => {
        setIsDetailOpen(false)
    }
    return (
        <>
            <Drawer title="User Information" open={isDetailOpen} onClose={onClose} >
                <p>{`ID : ${detailUser._id}`}</p>
                <p>{`Full Name : ${detailUser.fullName}`}</p>
                <p>{`Email : ${detailUser.email}`}</p>
                <p>{`Phone : ${detailUser.phone}`}</p>
                <p>{`Role : ${detailUser.role}`}</p>
                <div>
                    <p>Avatar :</p>
                    <img
                        height={100}
                        width={100}
                        src={`http://localhost:8080/images/avatar/${detailUser.avatar}`}
                    />
                </div>
            </Drawer>
        </>
    )
}
export default UserDetail;