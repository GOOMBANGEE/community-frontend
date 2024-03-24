import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { useReplyStore } from "../../../store/ReplyStore.tsx";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";
import { useCommentStore } from "../../../store/CommentStore.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function useCommentDelete() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { resetCommentState } = useCommentStore();
  const { communityId, postId, commentId } = useParams();

  const commentDelete = async (password: string) => {
    try {
      await axios.delete(
        `${envState.communityUrl}/${communityId}/${postId}/${commentId}/delete?password=${password}`,
      );
      resetCommentState();
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentDelete };
}
