import axios from "axios";
import { setCookie } from "../../Cookie.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import useRefreshAccessToken from "../useRefreshAcccessToken.tsx";

export default function useLogin() {
  const { refreshAccessToken } = useRefreshAccessToken();
  const { userState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const login = async () => {
    try {
      const response = await axios.post(`${envState.userUrl}/login`, {
        email: userState.email,
        password: userState.password,
      });

      const today = new Date();
      const expireDate = today.setDate(today.getDate() + 1);
      const refreshToken = response.data.refresh_token;
      setCookie("refresh_token", refreshToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(expireDate),
      });

      void refreshAccessToken(refreshToken);
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
      return false;
    }
  };

  return { login };
}
