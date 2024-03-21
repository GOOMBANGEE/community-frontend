import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleAxiosErrorPage } from "../handleAxiosErrorPage.tsx";

export default function useRecoverCheck() {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState<boolean>(false);

  const recoverCheck = async () => {
    try {
      await axios.get(`${envState.userUrl}/recover/${token}`);
      setIsValidToken(true);
      setGlobalState({ loading: false });
    } catch (error) {
      handleAxiosErrorPage(error, setGlobalState);
    }
  };

  useEffect(() => {
    void recoverCheck();
  }, []);

  return isValidToken;
}
