import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../handleAxiosError.tsx";

export function useFetchCommunityPreviewPostList(communityId: number) {
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const [result, setResult] = useState<Post>();

  const fetchPostList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}?p=1&size=10`,
      );
      setResult(response.data.items);
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  }, [communityId, envState.communityUrl]);

  useEffect(() => {
    void fetchPostList();
  }, []);

  return result;
}
