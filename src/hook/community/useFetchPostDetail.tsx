import { useEffect } from "react";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../store/PostStore.tsx";

export default function useFetchPostDetail() {
  const { communityId, postId } = useParams();
  const { envState } = useEnvStore();
  const { postState, setPostState } = usePostStore();

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/${postId}`,
      );
      setPostState(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    void fetchPost();
    setPostState({ ...postState, communityId: communityId });
  }, []);
}
