import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useCommentStore } from "../../../store/CommentStore.tsx";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";

export default function useCommentUpdate() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { commentState } = useCommentStore();
  const { communityId, postId } = useParams();

  const commentUpdate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/${commentState.id}/update`,
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

  return { commentUpdate };
}
