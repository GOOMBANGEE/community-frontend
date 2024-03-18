import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useReplyStore } from "../../../store/ReplyStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosError } from "../../handleAxiosError.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function useReplyCreate() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { replyState } = useReplyStore();
  const { communityId, postId } = useParams();
  const replyCreate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/create`,
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

  return { replyCreate };
}
