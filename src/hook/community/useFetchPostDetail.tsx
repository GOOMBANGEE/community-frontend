import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../store/PostStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";

export default function useFetchPostDetail() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { setPostState } = usePostStore();
  const { communityId, postId } = useParams();

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/${postId}`,
      );
      setPostState(response.data);
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { fetchPost };
}
