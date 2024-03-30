import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../store/PostStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

export default function useFetchPostDetail() {
  const { setPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/${postId}`,
      );
      setPostState(response.data);
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
      return false;
    }
  };

  return { fetchPostDetail };
}
