import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useCommentStore } from "../../../store/CommentStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function useCommentCreate() {
  const { commentState } = useCommentStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
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
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentCreate };
}
