import axios, { isAxiosError } from "axios";
import { useEnvStore } from "../store/EnvStore.ts";
import { useTokenStore } from "../store/TokenStore.ts";
import { useGlobalStore } from "../store/GlobalStore.ts";
import { useUserStore } from "../store/UserStore.ts";

export default function useRefreshAccessToken() {
  const { setUserState } = useUserStore();
  const { setTokenState, setHeaderAccessToken } = useTokenStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  let accessTokenExpires: number | undefined = undefined;
  const refreshAccessToken = async () => {
    const authUrl = envState.authUrl;
    try {
      const response = await axios.get(`${authUrl}/refresh`, {
        withCredentials: true, // 쿠키에 담긴 refreshToken 요청에 첨부
      });

      // accessToken 헤더에 담아서 이후 요청보낼때는 Authorization 추가
      const accessToken = response.data.accessToken;
      accessTokenExpires = response.data.accessTokenExpires;
      setUserState({ id: response.data.id, username: response.data.username });
      setHeaderAccessToken(accessToken);
    } catch (error) {
      setTokenState({ accessToken: undefined });
      if (isAxiosError(error)) {
        setGlobalState({
          modalMessage: error.response?.data.message,
          redirectName: "홈으로",
          redirectUrl: "reloadHome",
        });
      }
    } finally {
      setTimeout(() => {
        if (accessTokenExpires) refreshAccessToken();
      }, accessTokenExpires);
    }
  };

  return { refreshAccessToken };
}
