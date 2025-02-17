import axios, { isAxiosError } from "axios";
import { useEnvStore } from "../../store/EnvStore.ts";
import { useUserStore } from "../../store/UserStore.ts";
import { useTokenStore } from "../../store/TokenStore.ts";

export default function useLogin() {
  const { userState, setUserState } = useUserStore();
  const { envState } = useEnvStore();
  const { setHeaderAccessToken } = useTokenStore();

  const login = async () => {
    const authUrl = envState.authUrl;
    try {
      const response = await axios.post(
        `${authUrl}/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true,
        },
      );
      // accessToken 헤더에 담아서 이후 요청보낼때는 Authorization 추가
      const accessToken = response.data.accessToken;
      setUserState({ username: response.data.username });
      setHeaderAccessToken(accessToken);
      if (accessToken) {
        return true;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setUserState({ loginError: error.response?.data?.message });
      }
      return false;
    }
  };

  return { login };
}
