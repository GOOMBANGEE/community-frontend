import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

interface Props {
  email: string;
}

export default function useRecover() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const recover = async (props: Props) => {
    try {
      await axios.post(`${envState.userUrl}/recover`, {
        email: props.email,
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
