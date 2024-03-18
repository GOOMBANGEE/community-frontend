import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";
import { useUserStore } from "../../store/UserStore.tsx";

// 메일 다시보내기
export default function useEmailSend() {
  const { userState } = useUserStore();
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();

  const emailSend = async () => {
    try {
      await axios.post(`${envState.userUrl}/email/send`, {
        email: userState.email,
        token: userState.token,
      });
      setGlobalState({ modalMessage: "메일이 정상적으로 발송되었습니다." });
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { emailSend };
}
