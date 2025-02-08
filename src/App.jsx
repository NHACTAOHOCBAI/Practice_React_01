import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/layout"
import Home from "./pages/home/home"
import { User } from "./pages/user/user"
import Book from "./pages/book/book"
import NoPage from "./pages/error/noPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="books" element={<Book />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
