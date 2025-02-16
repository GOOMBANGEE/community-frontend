import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useEnvStore } from "../../store/EnvStore.ts";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";

export default function useUserDelete() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const userDelete = async () => {
    const userUrl = envState.userUrl;
    try {
      await axios.delete(userUrl, { withCredentials: true });
      setGlobalState({
        modalMessage: "계정이 비활성화 되었습니다",
        redirectName: "닫기",
        redirectUrl: "reloadHome",
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { userDelete };
}
