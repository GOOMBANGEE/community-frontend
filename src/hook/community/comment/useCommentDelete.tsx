import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";
import { useCommentStore } from "../../../store/CommentStore.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

interface Props {
  password: string;
}

export default function useCommentDelete() {
  const { resetCommentState } = useCommentStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId, commentId } = useParams();

  const commentDelete = async (props: Props) => {
    try {
      await axios.delete(
        `${envState.communityUrl}/${communityId}/${postId}/${commentId}/delete?password=${props.password}`,
      );
      resetCommentState();
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentDelete };
}
