import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { PostState } from "../../store/PostStore.tsx";
import { ReplyState } from "../../store/ReplyStore.tsx";

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

  const passwordCheckPost = async ({ postState, password }: checkPostProps) => {
    try {
      await axios.get(
        `${envState.communityUrl}/${postState.communityId}/${postState.id}/check?password=${password}`,
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
        `${envState.communityUrl}/${replyState.communityId}/${replyState.postId}/${replyState.id}/check?password=${password}`,
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
