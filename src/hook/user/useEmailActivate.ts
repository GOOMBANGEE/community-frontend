import { useGlobalStore } from "../../store/GlobalStore.ts";
import { deleteCookie } from "../../Cookie.ts";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.ts";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";
import { useUserStore } from "../../store/UserStore.ts";

interface Props {
  activationCode: string;
}

export function useEmailActivate() {
  const { userState, setUserState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const emailActivate = async (props: Props) => {
    const authUrl = envState.authUrl;
    try {
      await axios.post(`${authUrl}/email/activate?token=${userState.token}`, {
        activationCode: Number(props.activationCode),
      });
      setGlobalState({
        modalMessage: "가입이 완료되었습니다",
        redirectName: "로그인",
        redirectUrl: "/user/login",
      });
      deleteCookie("token");
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
      setUserState({
        codeError: "코드를 다시 한번 확인해 주세요",
      });
      return false;
    }
  };

  return { emailActivate };
}
