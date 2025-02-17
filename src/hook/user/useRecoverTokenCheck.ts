import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useEnvStore } from "../../store/EnvStore.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { handleAxiosErrorPage } from "../handleAxiosErrorPage.ts";

export default function useRecoverTokenCheck() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { token } = useParams();

  const recoverTokenCheck = async () => {
    const userUrl = envState.userUrl;
    try {
      await axios.get(`${userUrl}/recover?token=${token}`);
      setGlobalState({ loading: false });
      return true;
    } catch (error) {
      handleAxiosErrorPage(error, setGlobalState);
      return false;
    }
  };

  return { recoverTokenCheck };
}
