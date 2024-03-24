import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

export default function useResetPassword() {
  const { userState, resetUserState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const resetPassword = async () => {
    try {
      await axios.post(`${envState.userUrl}/reset/password`, {
        prev_password: userState.prevPassword,
        password: userState.password,
      });
      resetUserState();
      setGlobalState({
        modalMessage: "비밀번호가 변경되었습니다",
        redirectName: "닫기",
        redirectUrl: "reload",
      });
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { resetPassword };
}
