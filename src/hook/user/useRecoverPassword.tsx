import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useParams } from "react-router-dom";

export default function useRecoverPassword() {
  const { userState, resetUserState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { token } = useParams();

  const recoverPassword = async () => {
    try {
      await axios.post(`${envState.userUrl}/recover/password`, {
        token: token,
        password: userState.password,
      });
      resetUserState();
      setGlobalState({
        modalMessage: "비밀번호가 변경되었습니다",
        redirectName: "닫기",
        redirectUrl: "/",
      });
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { recoverPassword };
}
