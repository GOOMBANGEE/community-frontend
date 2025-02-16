import axios from "axios";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useEnvStore } from "../../store/EnvStore.ts";
import { useUserStore } from "../../store/UserStore.ts";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";

export default function useUserUpdate() {
  const { userState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const updateUser = async () => {
    const userUrl = envState.userUrl;
    try {
      await axios.patch(
        userUrl,
        {
          username: userState.newUsername,
          prevPassword: userState.prevPassword,
          password: userState.password,
          confirmPassword: userState.confirmPassword,
        },
        {
          withCredentials: true,
        },
      );
      setGlobalState({
        modalMessage: "유저정보가 변경되었습니다",
        redirectName: "닫기",
        redirectUrl: "reload",
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { updateUser };
}
