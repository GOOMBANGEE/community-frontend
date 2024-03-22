import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";
import { PostList } from "../../page/community/postList/PostList.tsx";

interface Props {
  setPostList: (state: PostList) => void;
}

export default function useFetchPostList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId } = useParams();
  const [searchParams] = useSearchParams();
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const mode = searchParams.get("mode");
  const fetchPostList = async (prop: Props) => {
    let apiUrl = `${envState.communityUrl}/${communityId}`;
    if (mode) {
      apiUrl += `?mode=${mode}`;
    }
    if (target && keyword) {
      apiUrl += `${apiUrl.includes("?") ? "&" : "?"}target=${target}&keyword=${keyword}`;
    }

    try {
      const response = await axios.get(apiUrl);
      prop.setPostList({
        items: response.data.items,
        page: response.data.page,
        page_size: response.data.page_size,
        total_page: response.data.total_page,
        prev: response.data.prev,
        next: response.data.next,
      });
      setGlobalState({ loading: false });
      return;
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { fetchPostList };
}
