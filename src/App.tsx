import Home from "./page/home/Home.tsx";
import { Route, Routes } from "react-router-dom";
import User from "./page/user/User.tsx";
import Header from "./component/Header.tsx";

import useFetchProfile from "./hook/useFetchProfile.tsx";
import useRefreshAccessToken from "./hook/useRefreshAcccessToken.tsx";
import Community from "./page/community/Community.tsx";

export default function App() {
  useRefreshAccessToken();
  useFetchProfile();

  return (
    <>
      <Routes>
        <Route path="/*" element={<Header />} />
      </Routes>
      <Routes>
        <Route index element={<Home />} />
        <Route path="user/*" element={<User />} />
        <Route path="community/*" element={<Community />} />
      </Routes>
    </>
  );
}
