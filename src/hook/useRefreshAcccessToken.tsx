import axios from "axios";
import { deleteCookie } from "../Cookie.tsx";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useTokenStore } from "../store/TokenStore.tsx";
import { useGlobalStore } from "../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "./handleAxiosErrorModal.tsx";

const TOKEN_EXPIRE_TIME = import.meta.env.VITE_TOKEN_EXPIRE_TIME;

export default function useRefreshAccessToken() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { setHeaderAccessToken } = useTokenStore();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      // refreshtoken를 쿠키에서 가져와서 실행
      const response = await axios.post(`${envState.userUrl}/refresh`, {
        refresh_token: refreshToken,
      });
      setHeaderAccessToken(response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        handleAxiosErrorModal(error, setGlobalState);
        if (error.response?.data.id === "USER:TOKEN_INVALID") {
          deleteCookie("refresh_token");
        }
      }
    } finally {
      setTimeout(() => {
        void refreshAccessToken(refreshToken);
      }, TOKEN_EXPIRE_TIME);
    }
  };

  return { refreshAccessToken };
}
