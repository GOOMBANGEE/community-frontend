import Home from "./page/home/Home.tsx";
import { Route, Routes } from "react-router-dom";
import User from "./page/user/User.tsx";
import Header from "./component/Header.tsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Header />} />
      </Routes>
      <Routes>
        <Route index element={<Home />} />
        <Route path="user/*" element={<User />} />
      </Routes>
    </>
  );
}
