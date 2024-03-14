import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useReplyStore } from "../../../store/ReplyStore.tsx";

export default function useReplyUpdate() {
  const { envState } = useEnvStore();
  const { replyState } = useReplyStore();

  const replyUpdate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${replyState.communityId}/${replyState.postId}/${replyState.id}/update`,
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
