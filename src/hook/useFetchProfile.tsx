import axios from "axios";
import { useEnvStore } from "../store/EnvStore.tsx";
import { useUserStore } from "../store/UserStore.tsx";
import { useEffect } from "react";
import { useTokenStore } from "../store/TokenStore.tsx";

export default function useFetchProfile() {
  const { envState } = useEnvStore();
  const { tokenState } = useTokenStore();
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${envState.userUrl}/profile`);
      console.log(response);
      const { id, email, nickname } = response.data;
      useUserStore.getState().setUserState({ id, email, nickname });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tokenState.accessToken) {
      void fetchProfile();
    }
  }, []);
}
