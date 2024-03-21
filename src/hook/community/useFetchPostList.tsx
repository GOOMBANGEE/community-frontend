import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
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
  const page = searchParams.get("p");
  const fetchPostList = async (prop: Props) => {
    let apiUrl = `${envState.communityUrl}/${communityId}`;
    const queryParams = [];
    if (mode) {
      queryParams.push(`mode=${mode}`);
    }
    if (target && keyword) {
      queryParams.push(`target=${target}&keyword=${keyword}`);
    }
    apiUrl +=
      queryParams.length > 0
        ? `?${queryParams.join("&")}&p=${page}`
        : `?p=${page}`;

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
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchPostList };
}
