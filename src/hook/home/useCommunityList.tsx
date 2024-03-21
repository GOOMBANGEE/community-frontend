import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

export function useCommunityList() {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const [result, setResult] = useState<Community>();

  const fetchCommunityList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/list?page=1&page_size=3`,
      );
      setResult(response.data.items);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  }, [envState.communityUrl, setGlobalState]);

  useEffect(() => {
    void fetchCommunityList();
  }, []);

  return result;
}
