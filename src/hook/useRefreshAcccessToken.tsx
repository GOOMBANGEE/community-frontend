import axios from "axios";
import { deleteCookie, getCookie } from "../Cookie.tsx";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useEffect } from "react";
import { useTokenStore } from "../store/TokenStore.tsx";

const refreshToken = getCookie("refresh_token");
export default function useRefreshAccessToken() {
  const { envState } = useEnvStore();
  const { getAccessToken } = useTokenStore();

  const refreshAccessToken = async () => {
    try {
      // refreshtoken를 쿠키에서 가져와서 실행
      const response = await axios.post(`${envState.userUrl}/refresh`, {
        refresh_token: refreshToken,
      });
      getAccessToken(response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        if (error.response?.data.id === "USER:TOKEN_INVALID") {
          deleteCookie("refresh_token");
        }
      }
    }
  };

  useEffect(() => {
    if (refreshToken) {
      void refreshAccessToken();
    }
  }, []);
}
