import axios from "axios";
import { setCookie } from "../../Cookie.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useUserStore } from "../../store/UserStore.tsx";

export default function useRegister() {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const { userState, setUserState } = useUserStore();

  const register = async () => {
    try {
      const response = await axios.post(`${envState.userUrl}/register`, {
        email: userState.email,
        nickname: userState.nickname,
        password: userState.password,
      });

      setUserState({
        ...userState,
        token: response.data.token,
        password: "",
        confirmPassword: "",
      });
      // 응답들어오면 토큰 state와 쿠키에 저장
      // email token제외 모두 초기화
      const today = new Date();
      const expireDate = today.setDate(today.getDate() + 1);
      setCookie("email", userState.email, {
        sameSite: "strict",
        path: "/",
        expires: new Date(expireDate),
      });
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
