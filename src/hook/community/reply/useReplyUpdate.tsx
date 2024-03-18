import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useReplyStore } from "../../../store/ReplyStore.tsx";
import { useParams } from "react-router-dom";

export default function useReplyUpdate() {
  const { envState } = useEnvStore();
  const { replyState } = useReplyStore();
  const { communityId, postId, replyId } = useParams();

  const replyUpdate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/${replyId}/update`,
        {
          content: replyState.content,
          nickname: replyState.nickname,
          password: replyState.password,
        },
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return { replyUpdate };
}
