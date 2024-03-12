import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useParams } from "react-router-dom";

export default function usePostUpdate() {
  const { envState } = useEnvStore();
  const { postState, resetPostState } = usePostStore();
  const { communityId, postId } = useParams();

  const postUpdate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/update`,
        {
          title: postState.title,
          content: postState.content,
          password: postState.password,
        },
      );
      resetPostState();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return { postUpdate };
}
