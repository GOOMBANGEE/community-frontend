import { useEnvStore } from "../../store/EnvStore.ts";
import axios from "axios";
import { useUserStore } from "../../store/UserStore.ts";
import { useTokenStore } from "../../store/TokenStore.ts";

export default function useLogout() {
  const { resetUserState } = useUserStore();
  const { setTokenState } = useTokenStore();
  const { envState } = useEnvStore();

  const logout = async () => {
    const authUrl = envState.authUrl;
    await axios.get(`${authUrl}/logout`, {
      withCredentials: true,
    });
    resetUserState();
    setTokenState({ accessToken: undefined });
  };

  return { logout };
}
