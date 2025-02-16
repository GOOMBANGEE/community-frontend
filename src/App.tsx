import Home from "./page/home/Home.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import User from "./page/user/User.tsx";
import Header from "./component/Header.tsx";

import Community from "./page/community/Community.tsx";
import { useEffect } from "react";
import useRefreshAccessToken from "./hook/useRefreshAcccessToken.ts";

export default function App() {
  const { refreshAccessToken } = useRefreshAccessToken();
  const location = useLocation();
  const userPage =
    location.pathname.startsWith("/user/login") ||
    location.pathname.startsWith("/user/register");

  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <>
      {!userPage && (
        <Routes>
          <Route path="/*" element={<Header />} />
        </Routes>
      )}
      <Routes>
        <Route index element={<Home />} />
        <Route path="user/*" element={<User />} />
        <Route path="community/*" element={<Community />} />
      </Routes>
    </>
  );
}
