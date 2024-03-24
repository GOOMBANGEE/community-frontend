import axios from "axios";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useUserStore } from "../store/UserStore.tsx";
import { handleAxiosErrorModal } from "./handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../store/GlobalStore.tsx";

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
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchProfile };
}
