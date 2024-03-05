import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../handleAxiosError.tsx";

export function useCommunityList() {
  const { globalState, setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const [result, setResult] = useState<Community>();

  const fetchCommunityList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/list?page=1&page_size=3`,
      );
      setResult(response.data.items);
    } catch (error) {
      handleAxiosError(error, globalState, setGlobalState);
    }
  }, [envState.communityUrl, setGlobalState]);

  useEffect(() => {
    void fetchCommunityList();
  }, [fetchCommunityList]);

  return result;
}
