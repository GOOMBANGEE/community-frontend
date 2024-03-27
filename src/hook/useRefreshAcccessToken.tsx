import axios from "axios";
import { deleteCookie } from "../Cookie.tsx";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useTokenStore } from "../store/TokenStore.tsx";
import { useGlobalStore } from "../store/GlobalStore.tsx";

const TOKEN_EXPIRE_TIME = import.meta.env.VITE_TOKEN_EXPIRE_TIME;

export default function useRefreshAccessToken() {
  const { setHeaderAccessToken } = useTokenStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      // refreshtoken를 쿠키에서 가져와서 실행
      const response = await axios.post(`${envState.userUrl}/refresh`, {
        refresh_token: refreshToken,
      });
      // accessToken 헤더에 담아서 이후 요청보낼때는 Authorization 추가
      setHeaderAccessToken(response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // refresh_token이 만료되거나 잘못된 경우 쿠키 삭제하여 로그인 유도
        if (
          error.response?.data.id === "USER:TOKEN_INVALID" ||
          error.response?.data.id === "USER:USER_UNREGISTERED"
        ) {
          deleteCookie("refresh_token");

          setGlobalState({
            modalMessage: error.response?.data.message,
            redirectName: "홈으로",
            redirectUrl: "reloadHome",
          });
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
