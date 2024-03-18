import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { PostState } from "../../store/PostStore.tsx";
import { ReplyState } from "../../store/ReplyStore.tsx";
import { useParams } from "react-router-dom";

interface checkPostProps {
  postState: PostState;
  password: string;
}

interface checkReplyProps {
  replyState: ReplyState;
  password: string;
}

export default function usePasswordCheck() {
  const { envState } = useEnvStore();
  const { communityId } = useParams();

  const passwordCheckPost = async ({ postState, password }: checkPostProps) => {
    try {
      await axios.get(
        `${envState.communityUrl}/${communityId}/${postState.id}/check?password=${password}`,
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return false;
      }
    }
  };

  const passwordCheckReply = async ({
    replyState,
    password,
  }: checkReplyProps) => {
    try {
      await axios.get(
        `${envState.communityUrl}/${communityId}/${replyState.postId}/${replyState.id}/check?password=${password}`,
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return false;
      }
    }
  };

  return { passwordCheckPost, passwordCheckReply };
}
