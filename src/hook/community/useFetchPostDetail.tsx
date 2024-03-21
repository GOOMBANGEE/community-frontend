import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../store/PostStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

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
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchPost };
}
