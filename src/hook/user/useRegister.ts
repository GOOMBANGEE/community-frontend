import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";
import { useEnvStore } from "../../store/EnvStore.ts";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useUserStore } from "../../store/UserStore.ts";
import { setCookie } from "../../Cookie.ts";

export default function useRegister() {
  const { userState, setUserState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const register = async () => {
    const authUrl = envState.authUrl;
    try {
      const response = await axios.post(`${authUrl}/register`, {
        email: userState.email,
        username: userState.username,
        password: userState.password,
        confirmPassword: userState.confirmPassword,
      });

      // 응답들어오면 토큰 state와 쿠키에 저장
      setUserState({
        ...userState,
        password: undefined,
        confirmPassword: undefined,
        token: response.data.token,
      });

      const today = new Date();
      const expireDate = today.setDate(today.getDate() + 1);
      setCookie("token", response.data.token, {
        sameSite: "strict",
        path: "/",
        expires: new Date(expireDate),
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { register };
}
