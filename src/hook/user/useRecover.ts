import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useEnvStore } from "../../store/EnvStore.ts";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";
import { useUserStore } from "../../store/UserStore.ts";

export default function useRecover() {
  const { userState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const recover = async () => {
    const userUrl = envState.userUrl;
    try {
      await axios.post(`${userUrl}/recover`, {
        email: userState.email,
      });
      setGlobalState({
        modalMessage: "인증 메일을 보냈습니다. 메일을 확인해주세요",
        redirectName: "홈으로",
        redirectUrl: "/",
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };
  return { recover };
}
