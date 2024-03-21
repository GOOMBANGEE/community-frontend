import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { useReplyStore } from "../../../store/ReplyStore.tsx";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function useReplyDelete() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { resetReplyState } = useReplyStore();
  const { communityId, postId, replyId } = useParams();

  const replyDelete = async (password: string) => {
    try {
      await axios.delete(
        `${envState.communityUrl}/${communityId}/${postId}/${replyId}/delete?password=${password}`,
      );
      resetReplyState();
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { replyDelete };
}
