import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

export default function useRecover() {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();

  const recover = async (email: string) => {
    try {
      await axios.post(`${envState.userUrl}/recover`, {
        email: email,
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
