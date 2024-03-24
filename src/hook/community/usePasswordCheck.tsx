import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { PostState } from "../../store/PostStore.tsx";
import { CommentState } from "../../store/CommentStore.tsx";
import { useParams } from "react-router-dom";

interface checkPostProps {
  postState: PostState;
  password: string;
}

interface checkCommentProps {
  commentState: CommentState;
  password: string;
}

export default function usePasswordCheck() {
  const { envState } = useEnvStore();
  const { communityId } = useParams();

  const passwordCheckPost = async (props: checkPostProps) => {
    try {
      await axios.get(
        `${envState.communityUrl}/${communityId}/${props.postState.id}/check?password=${props.password}`,
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return false;
      }
    }
  };

  const passwordCheckComment = async (props: checkCommentProps) => {
    try {
      await axios.get(
        `${envState.communityUrl}/${communityId}/${props.commentState.postId}/${props.commentState.id}/check?password=${props.password}`,
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return false;
      }
    }
  };

  return { passwordCheckPost, passwordCheckComment };
}
