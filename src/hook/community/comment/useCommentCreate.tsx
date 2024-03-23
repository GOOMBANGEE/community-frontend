import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useCommentStore } from "../../../store/CommentStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosError } from "../../handleAxiosError.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function useCommentCreate() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { commentState } = useCommentStore();
  const { communityId, postId } = useParams();
  const commentCreate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/create`,
        {
          content: commentState.content,
          nickname: commentState.nickname,
          password: commentState.password,
        },
      );
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { commentCreate };
}
