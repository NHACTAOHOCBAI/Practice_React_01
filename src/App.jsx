import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/layout"
import Home from "./pages/home/home"
import { User } from "./pages/user/user"
import Book from "./pages/book/book"
import NoPage from "./pages/error/noPage"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import { createContext, useState, useEffect } from "react"
import { getAccount } from "./services/api.service"
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const UserInformationContext = createContext();
function App() {
  const [userInformation, setUserInformation] = useState();
  const [isAppLoading, setIsAppLoading] = useState(false);
  const getUserInformation = async () => {
    setIsAppLoading(true);
    const resGetUser = await getAccount();
    if (resGetUser.data) {
      setUserInformation(resGetUser.data.user.fullName);
    }
    setIsAppLoading(false);
  }
  useEffect(() => {
    getUserInformation();
  }, [])
  return (
    <>
      {
        isAppLoading == true ?
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
          :
          <UserInformationContext.Provider value={{ userInformation, setUserInformation }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="users" element={<User />} />
                  <Route path="books" element={<Book />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </UserInformationContext.Provider>
      }
    </>
  )
}

export { App, UserInformationContext }
