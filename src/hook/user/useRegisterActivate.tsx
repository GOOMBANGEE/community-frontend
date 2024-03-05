import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { deleteCookie, getCookie } from "../../Cookie.tsx";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";

interface Props {
  verificationCode: string;
  validateUser: ValidateUser;
  setValidateUser: (state: ValidateUser) => void;
}

export function useRegisterActivate() {
  const { globalState, setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();

  const token = getCookie("token");

  const registerActivate = async (props: Props) => {
    try {
      const response = await axios.post(`${envState.userUrl}/email/activate`, {
        token: token,
        verification_code: props.verificationCode,
      });
      console.log(response);
      setGlobalState({
        ...globalState,
        modalMessage: "가입이 완료되었습니다",
        redirectName: "로그인",
        redirectUrl: "/user/login",
      });
      deleteCookie("token");
      deleteCookie("email");

      return true;
    } catch (error) {
      handleAxiosError(error, globalState, setGlobalState);
      props.setValidateUser({
        ...props.validateUser,
        codeError: "코드를 다시 한번 확인해 주세요",
      });
      return false;
    }
  };

  return { registerActivate };
}
