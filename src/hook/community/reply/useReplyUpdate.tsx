import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useReplyStore } from "../../../store/ReplyStore.tsx";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import { handleAxiosError } from "../../handleAxiosError.tsx";

export default function useReplyUpdate() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { replyState } = useReplyStore();
  const { communityId, postId } = useParams();

  const replyUpdate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/${replyState.id}/update`,
        {
          content: replyState.content,
          nickname: replyState.nickname,
          password: replyState.password,
        },
      );
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { replyUpdate };
}
