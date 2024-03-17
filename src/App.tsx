import Home from "./page/home/Home.tsx";
import { Route, Routes } from "react-router-dom";
import User from "./page/user/User.tsx";
import Header from "./component/Header.tsx";

import useFetchProfile from "./hook/useFetchProfile.tsx";
import useRefreshAccessToken from "./hook/useRefreshAcccessToken.tsx";
import Community from "./page/community/Community.tsx";
import { useEffect } from "react";
import { useTokenStore } from "./store/TokenStore.tsx";
import { getCookie } from "./Cookie.tsx";

export default function App() {
  const { tokenState } = useTokenStore();
  const { fetchProfile } = useFetchProfile();
  const { refreshAccessToken } = useRefreshAccessToken();

  const refreshToken = getCookie("refresh_token");
  useEffect(() => {
    if (refreshToken) {
      void refreshAccessToken(refreshToken);
    }
  }, []);

  useEffect(() => {
    if (tokenState.accessToken) {
      void fetchProfile();
    }
  }, [tokenState.accessToken]);

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
