import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../handleAxiosError.tsx";

export function usePostList(communityId: number) {
  const { globalState, setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const [result, setResult] = useState<Post>();

  const fetchPostList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}`,
      );
      setResult(response.data.items);
    } catch (error) {
      handleAxiosError(globalState, setGlobalState, error);
    }
  }, [communityId, envState.communityUrl]);

  useEffect(() => {
    void fetchPostList();
  }, []);

  return result;
}
