import { useParams } from "react-router-dom";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";
import { PostList } from "../../page/community/postList/PostList.tsx";

interface Props {
  best: boolean;
  setPostList: (state: PostList) => void;
}

export default function useFetchPostList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId } = useParams();

  const fetchPostList = async (prop: Props) => {
    const apiUrl = prop.best
      ? `${envState.communityUrl}/${communityId}/best`
      : `${envState.communityUrl}/${communityId}`;

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
