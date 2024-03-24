import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { deleteCookie } from "../../Cookie.tsx";

export default function useUserDelete() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const userDelete = async () => {
    try {
      await axios.delete(`${envState.userUrl}/delete`);
      setGlobalState({
        modalMessage: "계정이 비활성화 되었습니다",
        redirectName: "닫기",
        redirectUrl: "reloadHome",
      });
      deleteCookie("refresh_token");
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { userDelete };
}
