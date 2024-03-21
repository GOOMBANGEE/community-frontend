import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { deleteCookie, getCookie } from "../../Cookie.tsx";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

interface Props {
  code: string;
  setValidateState: (state: ValidateUser) => void;
}

export function useRegisterActivate() {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();

  const token = getCookie("token");

  const registerActivate = async (props: Props) => {
    try {
      await axios.post(`${envState.userUrl}/email/activate`, {
        token: token,
        code: props.code,
      });
      setGlobalState({
        modalMessage: "가입이 완료되었습니다",
        redirectName: "로그인",
        redirectUrl: "/user/login",
      });
      deleteCookie("token");
      deleteCookie("email");
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
      props.setValidateState({
        codeError: "코드를 다시 한번 확인해 주세요",
      });
      return false;
    }
  };

  return { registerActivate };
}
