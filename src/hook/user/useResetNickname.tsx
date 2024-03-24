import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

export default function useResetNickname() {
  const { userState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const resetNickname = async () => {
    try {
      await axios.post(`${envState.userUrl}/reset/nickname`, {
        nickname: userState.nickname,
      });
      setGlobalState({
        modalMessage: "닉네임이 변경되었습니다",
        redirectName: "닫기",
        redirectUrl: "reload",
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { resetNickname };
}
