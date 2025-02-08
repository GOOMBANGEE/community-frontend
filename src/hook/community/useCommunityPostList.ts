import { useParams, useSearchParams } from "react-router-dom";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import axios from "axios";
import { usePostStore } from "../../store/PostStore.tsx";
import { useCommunityStore } from "../../store/CommunityStore.ts";

export default function useCommunityPostList() {
  const { setCommunityState } = useCommunityStore();
  const { setPostListState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const { communityId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const communityPostList = async () => {
    const apiUrl = createApiUrl();

    try {
      const response = await axios.get(apiUrl);
      const { community, ...postList } = response.data;
      setCommunityState(community);
      setPostListState(postList);
      setGlobalState({ loading: false });
      return;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  const createApiUrl = () => {
    const communityUrl = envState.communityUrl;
    let apiUrl = `${communityUrl}/${communityId}`;
    const queryParams = [];
    if (mode) {
      queryParams.push(`mode=${mode}`);
    }
    if (target && keyword) {
      queryParams.push(`target=${target}&keyword=${keyword}`);
    }
    apiUrl +=
      queryParams.length > 0
        ? `?${queryParams.join("&")}&page=${page}`
        : `?page=${page}`;
    return apiUrl;
  };

  return { communityPostList };
}
