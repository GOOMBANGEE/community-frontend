import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";

export default function useResetNickname() {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const { userState } = useUserStore();

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
      setTimeout(() => {
        setGlobalState({ modalMessage: "" });
      }, 3000);
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { resetNickname };
}
