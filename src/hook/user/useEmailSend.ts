import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.ts";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";
import { useUserStore } from "../../store/UserStore.ts";

// 메일 다시보내기
export default function useEmailSend() {
  const { userState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const emailSend = async () => {
    try {
      const authUrl = envState.authUrl;
      await axios.get(`${authUrl}/email/send?token=${userState.token}`);
      setGlobalState({ modalMessage: "메일이 정상적으로 발송되었습니다." });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { emailSend };
}
