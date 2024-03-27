import axios from "axios";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useUserStore } from "../store/UserStore.tsx";
import { useGlobalStore } from "../store/GlobalStore.tsx";
import { deleteCookie } from "../Cookie.tsx";

export default function useFetchProfile() {
  const { setUserState } = useUserStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${envState.userUrl}/profile`);
      const { id, email, nickname } = response.data;
      setUserState({ id, email, nickname });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // refresh_token이 만료되거나 잘못된 경우 쿠키 삭제하여 로그인 유도
        if (
          error.response?.data.id === "USER:TOKEN_INVALID" ||
          error.response?.data.id === "USER:USER_UNREGISTERED"
        ) {
          deleteCookie("refresh_token");

          setGlobalState({
            modalMessage: error.response?.data.message,
            redirectName: "홈으로",
            redirectUrl: "reloadHome",
          });
        }
      }
    }
  };

  return { fetchProfile };
}
