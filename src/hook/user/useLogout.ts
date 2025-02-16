import { useEnvStore } from "../../store/EnvStore.ts";
import axios from "axios";

export default function useLogout() {
  const { envState } = useEnvStore();
  const logout = async () => {
    const authUrl = envState.authUrl;
    await axios.get(`${authUrl}/logout`, {
      withCredentials: true,
    });
  };

  return { logout };
}
