import axios from "axios";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useUserStore } from "../store/UserStore.tsx";

export default function useFetchProfile() {
  const { envState } = useEnvStore();
  const { setUserState } = useUserStore();
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${envState.userUrl}/profile`);
      const { id, email, nickname } = response.data;
      setUserState({ id, email, nickname });
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchProfile };
}
