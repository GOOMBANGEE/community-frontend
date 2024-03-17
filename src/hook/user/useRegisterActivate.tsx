import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { deleteCookie, getCookie } from "../../Cookie.tsx";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";

interface Props {
  verificationCode: string;
  validateState: ValidateUser;
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
        verification_code: props.verificationCode,
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
      handleAxiosError(error, setGlobalState);
      props.setValidateState({
        ...props.validateState,
        codeError: "코드를 다시 한번 확인해 주세요",
      });
      return false;
    }
  };

  return { registerActivate };
}
