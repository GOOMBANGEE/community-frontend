import axios from "axios";
import { setCookie } from "../../Cookie.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useTokenStore } from "../../store/TokenStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";
import { useUserStore } from "../../store/UserStore.tsx";

export default function useLogin() {
  const { globalState, setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const { tokenState, setTokenState, getAccessToken } = useTokenStore();
  const { userState } = useUserStore();

  const login = async () => {
    try {
      const response = await axios.post(`${envState.userUrl}/login`, {
        email: userState.email,
        password: userState.password,
      });

      setTokenState({
        ...tokenState,
        accessToken: response.data.access_token,
      });

      const today = new Date();
      const expireDate = today.setDate(today.getDate() + 1);
      setCookie("refresh_token", response.data.refresh_token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(expireDate),
      });
      getAccessToken(response.data.access_token);
      return true;
    } catch (error) {
      handleAxiosError(error, globalState, setGlobalState);
      return false;
    }
  };

  return { login };
}
